import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Aspect ratio to hold while loading, for images without a fixed-size parent. */
  placeholderAspect?: string;
};

/**
 * Image that shows a soft shimmer until it has loaded, then fades in.
 * Needs a `relative` parent; the shimmer fills it.
 */
export function LoadingImage({ className = "", placeholderAspect, style, onLoad, ...img }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Cached images can finish before hydration, so check once on mount.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && (
        <span aria-hidden="true" className="shimmer pointer-events-none absolute inset-0" />
      )}
      <img
        ref={ref}
        {...img}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={!loaded && placeholderAspect ? { ...style, aspectRatio: placeholderAspect } : style}
      />
    </>
  );
}
