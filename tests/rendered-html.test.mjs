import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `${path} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("server-renders the branded Disclera homepage", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<html lang="en">/i);
  assert.match(html, /<title>Disclera \| Make every disclosure defensible<\/title>/i);
  assert.match(html, /name="description" content="The evidence layer for audit-ready CSRD and sustainability reporting\."/i);
  assert.match(html, /href="\/favicon\.svg"/i);
  assert.match(html, /Beyond/);
  assert.match(html, /Evidence/);
  assert.match(html, /Request demo/);
  assert.doesNotMatch(html, /Lovable|Your site is taking shape|Building your site/i);
});

test("server-renders every public demo route", async () => {
  const routes = [
    ["/collect", /Disclera Collect \| Bring every piece of evidence into focus/],
    ["/suppliers", /Disclera Suppliers \| Value-chain reporting in rhythm/],
    ["/report", /Disclera Report \| Disclosures you can defend/],
    ["/demo", /Request a tailored demo \| Disclera/],
    ["/sign-in", /Sign in \| Disclera/],
  ];

  for (const [path, title] of routes) {
    const html = await htmlFor(path);
    assert.match(html, title, `${path} should include its route title`);
    assert.match(html, /Disclera/i, `${path} should include the Disclera brand`);
  }
});

test("renders labelled conversion forms", async () => {
  const demo = await htmlFor("/demo");
  const signIn = await htmlFor("/sign-in");

  assert.match(demo, /First name/);
  assert.match(demo, /Work email/);
  assert.match(demo, /Company/);
  assert.match(demo, /type="email"/);
  assert.match(signIn, /Work email/);
  assert.match(signIn, /Password/);
  assert.match(signIn, /type="password"/);
});
