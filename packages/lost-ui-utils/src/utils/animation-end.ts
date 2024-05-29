import type { MaybeElement } from './scroll-to'

export function animationEnd(rootElement?: MaybeElement, subtree: boolean = true) {
  const root = rootElement || document.documentElement
  return Promise.allSettled(
    root.getAnimations({ subtree }).map(animation => animation.finished),
  )
}
