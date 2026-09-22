import Image from "next/image";

/**
 * next/image for admin-managed paths. Bundled photos (/images/…) are
 * optimised; uploads and external URLs are served as-is.
 */
export default function CmsImage({ src, alt = "", ...props }) {
  if (!src) return null;
  return <Image src={src} alt={alt} unoptimized={!src.startsWith("/images/")} {...props} />;
}
