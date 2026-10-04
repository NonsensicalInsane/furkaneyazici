// <Animation autoplay>: play muted while on screen, pause when scrolled away
// (no CPU spent on videos nobody is looking at), and leave it to the reader
// when they prefer reduced motion.
export function initAnimations() {
  const videos = document.querySelectorAll('video[data-autoplay]');
  if (!videos.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {}); // blocked autoplay: controls remain
        else target.pause();
      });
    },
    { threshold: 0.5 }
  );
  videos.forEach((video) => observer.observe(video));
}
