"use client";

import { useIntersectionObserver } from "./useIntersectionObserver";

export function useAnimationOnScroll(options?: IntersectionObserverInit) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.15,
    ...options,
  });

  return { ref, isVisible: isIntersecting };
}
