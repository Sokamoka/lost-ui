import { type MaybeComputedElementRef, type MaybeElement, unrefElement } from '@vueuse/core'
import { scrollTo } from '../../utils'

export type Element = HTMLElement | SVGElement

export function useScrollToPromise(rootElement?: MaybeComputedElementRef<MaybeElement>) {
  const scrollToPromise = (selector: string, offset?: number, duration?: number): Promise<void> => {
    const root = (unrefElement(rootElement) || document.documentElement) as Element
    const element = root.querySelector(selector) as Element

    return new Promise((resolve, reject) => {
      if (!element)
        return reject(new Error('Target element is undefined'))
      scrollTo(element, { offset, rootElement: root, duration, cb: resolve })
    })
  }

  return scrollToPromise
}
