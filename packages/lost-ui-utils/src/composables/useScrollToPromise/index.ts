import { type MaybeComputedElementRef, type MaybeElement, unrefElement } from '@vueuse/core'
import { scrollTo } from '../../utils'

export function useScrollToPromise(rootElement?: MaybeComputedElementRef<MaybeElement>) {
  const scrollToPromise = (selector: string = '[aria-invalid="true"]', offset?: number): Promise<void> => {
    const root = (unrefElement(rootElement) || document.documentElement) as HTMLElement || SVGElement
    const element = root.querySelector(selector) as HTMLElement || SVGElement

    return new Promise((resolve, reject) => {
      if (!element)
        return reject(new Error('Element is undefined'))
      scrollTo(element, { offset, rootElement: root, cb: resolve })
    })
  }

  return scrollToPromise
}
