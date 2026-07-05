import { useState } from "react";
import { ImagePlaceholderIcon } from "./icons/LucideIcons";

type MediaProps = {
  src?: string;
  alt: string;
  /** Optional caption shown inside the neutral fallback (e.g. the project title). */
  label?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * Renders an image and degrades to a calm, on-brand placeholder whenever the
 * source is missing or fails to load. This keeps every layout intact while the
 * real project assets have not been uploaded yet.
 */
export default function Media({ src, alt, label, className, loading = "lazy" }: MediaProps) {
  const [hasFailed, setHasFailed] = useState(() => !src);

  if (hasFailed) {
    return (
      <div className="media-fallback" role="img" aria-label={alt || label || "Platzhalter"}>
        <ImagePlaceholderIcon className="media-fallback-icon" />
        {label ? <span className="media-fallback-label">{label}</span> : null}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setHasFailed(true)}
    />
  );
}
