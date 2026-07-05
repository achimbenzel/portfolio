import { useState } from "react";

type SoftwareIconProps = {
  src?: string;
  name: string;
};

/**
 * Small tool icon used across the software chips. Falls back to the first letter
 * of the tool name so the chip stays readable without the icon asset.
 */
export default function SoftwareIcon({ src, name }: SoftwareIconProps) {
  const [hasFailed, setHasFailed] = useState(() => !src);

  if (hasFailed) {
    return (
      <span className="software-icon software-icon-fallback" aria-hidden="true">
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      className="software-icon"
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setHasFailed(true)}
    />
  );
}
