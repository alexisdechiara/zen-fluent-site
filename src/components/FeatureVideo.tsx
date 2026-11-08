import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "../motion";

/**
 * A short clip of a feature, recorded in Zen: muted, looping, playing only
 * while on screen. The poster shows before it loads, if it fails, and
 * instead of it with reduced motion.
 */
export function FeatureVideo({
  src,
  poster,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still] = useState(reducedMotion);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || still || failed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay refused: the poster stays */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [still, failed]);

  if (still || failed) {
    return (
      <img
        className={className}
        src={poster}
        alt={alt}
        width={1280}
        height={800}
        loading="lazy"
      />
    );
  }
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      aria-label={alt}
      width={1280}
      height={800}
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    />
  );
}
