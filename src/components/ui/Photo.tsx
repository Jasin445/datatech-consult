import Image from "next/image";
import type { Photo as PhotoData } from "@/content/media/photos";

/**
 * Registered photograph (src/content/media/photos.ts) rendered with next/image.
 * `fill` covers its positioned parent; otherwise the intrinsic ratio is kept.
 * Pass `decorative` only when the photo adds no information (empty alt).
 */
export function Photo({
  photo,
  sizes,
  className = "",
  fill = false,
  priority = false,
  decorative = false,
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  decorative?: boolean;
}) {
  const alt = decorative ? "" : photo.alt;
  return fill ? (
    <Image src={photo.src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
  ) : (
    <Image src={photo.src} alt={alt} width={photo.width} height={photo.height} sizes={sizes} priority={priority} className={`h-auto w-full object-cover ${className}`} />
  );
}
