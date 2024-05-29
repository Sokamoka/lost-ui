export interface ScrollToOptions {
  cb?: () => void
  duration?: number
  rootElement?: MaybeElement
  offset?: number
}

export type MaybeElement = HTMLElement | SVGElement | undefined | null

export function scrollTo(target: MaybeElement, options: ScrollToOptions = {}) {
  const { cb = () => {}, duration = 2000, rootElement, offset = 0 } = options

  const _rootElement = rootElement || document.documentElement

  if (!target)
    throw new Error('Target element is undefined')

  const to = getCoords(target, _rootElement).top + offset
  const toHorizontal = getCoords(target, _rootElement).left + offset

  function move(amount: number) {
    _rootElement.scrollTop = amount
  }

  function moveHorizontal(amount: number) {
    _rootElement.scrollLeft = amount
  }

  function position() {
    return { top: _rootElement.scrollTop, left: _rootElement.scrollLeft }
  }

  const start = position().top
  const startHorizontal = position().left

  const change = to - start
  const changeHorizontal = toHorizontal - startHorizontal

  let currentTime = 0
  const increment = 20

  const animateScroll = () => {
    currentTime += increment

    const value = easeOutSine(currentTime, start, change, duration)
    move(value)

    const valueHorizontal = easeOutSine(currentTime, startHorizontal, changeHorizontal, duration)
    moveHorizontal(valueHorizontal)

    if (currentTime < duration)
      requestAnimationFrame(animateScroll)
    else
      cb()
  }

  animateScroll()
}

function getCoords(el: HTMLElement | SVGElement, scrollOnElement: HTMLElement | SVGElement) {
  const box = el.getBoundingClientRect()
  const scrollOnElementRect = scrollOnElement.getBoundingClientRect()
  const scrollTop = scrollOnElement.scrollTop
  const scrollLeft = scrollOnElement.scrollLeft

  const top = box.top + scrollTop - (Math.abs(scrollOnElementRect.top) === scrollTop ? 0 : scrollOnElementRect.top)
  const left = box.left + scrollLeft - (Math.abs(scrollOnElementRect.left) === scrollLeft ? 0 : scrollOnElementRect.left)

  return {
    top: Math.round(top),
    left: Math.round(left),
  }
}

function easeOutSine(t: number, b: number, c: number, d: number) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b
}
