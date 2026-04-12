type BrandLogoProps = {
  className?: string;
};

/** Brand mark — replace `public/logo.svg` with your final artwork (PNG works at `/logo.png` if you prefer). */
export function BrandLogo({ className = "h-10 w-auto" }: BrandLogoProps) {
  return <img src="/logo.svg" alt="Digital Art Academy" className={className} />;
}
