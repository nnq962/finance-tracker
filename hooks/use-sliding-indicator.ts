"use client"

import { useCallback, useEffect, useRef } from "react"

type UseSlidingIndicatorOptions = {
  activeIndex: number
}

export function useSlidingIndicator<ItemElement extends HTMLElement>({
  activeIndex,
}: UseSlidingIndicatorOptions) {
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const itemRefs = useRef<(ItemElement | null)[]>([])
  const initializedRef = useRef(false)
  const activeIndexRef = useRef(activeIndex)

  const moveTo = useCallback((index: number, animate = true) => {
    const item = itemRefs.current[index]
    const indicator = indicatorRef.current

    if (!item || !indicator) return

    const move = () => {
      indicator.style.transform = `translate3d(${item.offsetLeft}px, 0, 0)`
      indicator.style.width = `${item.offsetWidth}px`
      indicator.style.opacity = "1"
    }

    if (animate) {
      move()
      return
    }

    const previousTransition = indicator.style.transition
    indicator.style.transition = "none"
    move()
    void indicator.offsetWidth
    indicator.style.transition = previousTransition
  }, [])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex < 0) return

    const frame = window.requestAnimationFrame(() => {
      moveTo(activeIndex, initializedRef.current)
      initializedRef.current = true
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeIndex, moveTo])

  useEffect(() => {
    const container = itemRefs.current.find(Boolean)?.parentElement
    const observer = new ResizeObserver(() => {
      if (activeIndexRef.current >= 0) {
        moveTo(activeIndexRef.current, false)
      }
    })

    if (container) observer.observe(container)

    return () => observer.disconnect()
  }, [moveTo])

  return { indicatorRef, itemRefs, moveTo }
}
