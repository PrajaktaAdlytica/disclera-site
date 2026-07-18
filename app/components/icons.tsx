import type { ComponentPropsWithoutRef } from "react";
import {
  Archive,
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Globe2,
  LayoutDashboard,
  Leaf,
  Link2,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Minus,
  MoreHorizontal,
  Play,
  Plus,
  Quote,
  Search,
  Send,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Upload,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { SiX, SiYoutube } from "react-icons/si";

const icons = {
  archive: Archive,
  alert: AlertCircle,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  bell: Bell,
  book: BookOpen,
  building: Building2,
  calendar: CalendarDays,
  check: Check,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  clipboardCheck: ClipboardCheck,
  clock: Clock3,
  database: Database,
  download: Download,
  externalLink: ExternalLink,
  eye: Eye,
  fileCheck: FileCheck2,
  file: FileText,
  globe: Globe2,
  help: CircleHelp,
  leaf: Leaf,
  link: Link2,
  lock: LockKeyhole,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  minus: Minus,
  more: MoreHorizontal,
  overview: LayoutDashboard,
  play: Play,
  plus: Plus,
  quote: Quote,
  search: Search,
  send: Send,
  settings: Settings2,
  shield: Shield,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  upload: Upload,
  users: UsersRound,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
};

export function Icon({ name, size = 18, strokeWidth = 1.8, label, className }: IconProps) {
  const Glyph = icons[name];
  const glyph = <Glyph aria-hidden="true" className={className} size={size} strokeWidth={strokeWidth} />;

  if (!label) return glyph;

  return (
    <span className={className} role="img" aria-label={label}>
      <Glyph aria-hidden="true" size={size} strokeWidth={strokeWidth} />
    </span>
  );
}

const socialIcons = {
  linkedin: FaLinkedinIn,
  x: SiX,
  youtube: SiYoutube,
} satisfies Record<string, IconType>;

export type SocialIconName = keyof typeof socialIcons;

export function SocialIcon({ name, size = 18, className }: { name: SocialIconName; size?: number; className?: string }) {
  const Glyph = socialIcons[name];
  return <Glyph aria-hidden="true" className={className} size={size} />;
}

export type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: IconName;
  label: string;
  iconSize?: number;
};

export function IconButton({ icon, label, iconSize = 18, className = "", ...props }: IconButtonProps) {
  return (
    <button {...props} className={`icon-control ${className}`.trim()} aria-label={label} title={label}>
      <Icon name={icon} size={iconSize} />
    </button>
  );
}
