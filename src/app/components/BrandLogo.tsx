import logoUrl from "@/assets/images/Logo.png";

type BrandLogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Official wordmark from `Logo.png`. Uses `object-contain` so aspect ratio is preserved;
 * control size with `max-h-*` + `w-auto` + optional `max-w-*` from the parent.
 */
export function BrandLogo({
  className = "max-h-9 w-auto max-w-[min(100vw-6rem,240px)] sm:max-h-10 sm:max-w-[280px] object-contain object-left",
  alt = "Digital Art Academy",
}: BrandLogoProps) {
  return <img src={logoUrl} alt={alt} className={className} decoding="async" />;
}
