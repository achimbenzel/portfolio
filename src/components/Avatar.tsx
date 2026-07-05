import { useState } from "react";

type AvatarProps = {
  src?: string;
  name: string;
  className?: string;
  loading?: "lazy" | "eager";
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/**
 * Portrait / person image that falls back to initials on a neutral tile when the
 * photo is unavailable.
 */
export default function Avatar({ src, name, className, loading = "lazy" }: AvatarProps) {
  const [hasFailed, setHasFailed] = useState(() => !src);
  const classes = ["avatar", className].filter(Boolean).join(" ");

  if (hasFailed) {
    return (
      <span className={`${classes} avatar-fallback`} role="img" aria-label={name}>
        <span aria-hidden="true">{getInitials(name)}</span>
      </span>
    );
  }

  return (
    <img
      className={classes}
      src={src}
      alt={name}
      loading={loading}
      onError={() => setHasFailed(true)}
    />
  );
}
