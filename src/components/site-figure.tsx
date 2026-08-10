import { cn } from "@/lib/utils";

type SiteFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9" */
  ratio?: string;
  width?: number;
  height?: number;
  objectPosition?: string;
  className?: string;
  eager?: boolean;
};

/**
 * Shared treatment for contained images: card radius, no border, no shadow,
 * no tints or filters, explicit dimensions plus CSS aspect-ratio so nothing
 * shifts while loading.
 */
export function SiteFigure({
  src,
  alt,
  caption,
  ratio = "16 / 9",
  width = 1920,
  height = 1080,
  objectPosition = "center",
  className,
  eager = false,
}: SiteFigureProps) {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("w-full rounded-lg object-cover")}
        style={{ aspectRatio: ratio, objectPosition }}
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
