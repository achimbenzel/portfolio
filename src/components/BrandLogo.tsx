import { useState } from "react";

type BrandLogoProps = {
  className?: string;
  src?: string;
};

/**
 * Wordmark logo that gracefully degrades to a typographic fallback so the brand
 * name is always present, even without the SVG asset.
 */
export default function BrandLogo({
  className,
  src = "/Assets/Logo/logo_wide_dark.svg",
}: BrandLogoProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const classes = ["brand-logo", className].filter(Boolean).join(" ");

  if (hasFailed) {
    return <span className={`${classes} brand-logo-fallback`}>Achim&nbsp;Benzel</span>;
  }

  return (
    <img className={classes} src={src} alt="Achim Benzel" onError={() => setHasFailed(true)} />
  );
}
