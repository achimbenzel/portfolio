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
