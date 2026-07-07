import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function LucideIcon({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="lucide-icon"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </LucideIcon>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="M5 12h14" />
    </LucideIcon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </LucideIcon>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="M10 4v16" />
      <path d="M14 4v16" />
    </LucideIcon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </LucideIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="m9 18 6-6-6-6" />
    </LucideIcon>
  );
}

export function Volume2Icon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </LucideIcon>
  );
}

export function Volume1Icon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </LucideIcon>
  );
}

export function VolumeXIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </LucideIcon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </LucideIcon>
  );
}

export function ImagePlaceholderIcon(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="1.6" />
      <path d="m21 15-4.35-4.35a2 2 0 0 0-2.83 0L4 20" />
    </LucideIcon>
  );
}
