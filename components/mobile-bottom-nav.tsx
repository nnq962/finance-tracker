"use client"

import { useEffect, useLayoutEffect, useRef, useState, useTransition, type PointerEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ArrowLeftRightIcon,
  ChartNoAxesCombinedIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  WalletCardsIcon,
} from "lucide-react"

const items = [
  { href: "/overview", label: "Tổng quan", icon: LayoutDashboardIcon },
  { href: "/accounts", label: "Tài khoản", icon: WalletCardsIcon },
  { href: "/transactions", label: "Giao dịch", icon: ArrowLeftRightIcon },
  { href: "/tracking", label: "Theo dõi", icon: ChartNoAxesCombinedIcon },
  { href: "/settings", label: "Cài đặt", icon: SettingsIcon },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const activeIndex = items.findIndex(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
  )
  const [selectedIndex, setSelectedIndex] = useState(activeIndex)
  // Server HTML already positions the glass at the current route. This value
  // stays fixed; after hydration the animation controller owns pixel transforms.
  const [initialIndex] = useState(activeIndex)
  const [routeState, setRouteState] = useState({ pathname, isPending })
  const [preview, setPreview] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const [indicatorWidth, setIndicatorWidth] = useState(0)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const indicatorAnimation = useRef<Animation | null>(null)
  const initialized = useRef(false)
  const dragFrame = useRef<number | null>(null)
  const gesture = useRef<{
    id: number
    x: number
    width: number
    startIndex: number
    position: number
    dragged: boolean
  } | null>(null)
  const suppressPointerClick = useRef(false)
  const visualIndex = preview ?? selectedIndex

  useEffect(() => () => {
    if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current)
    indicatorAnimation.current?.cancel()
  }, [])

  useLayoutEffect(() => {
    const indicator = indicatorRef.current
    if (!indicator) return
    const observer = new ResizeObserver(() => {
      setIndicatorWidth(indicator.getBoundingClientRect().width)
    })
    observer.observe(indicator)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const indicator = indicatorRef.current
    if (dragging || !indicator) return

    const width = indicator.getBoundingClientRect().width
    const currentTransform = getComputedStyle(indicator).transform
    const currentX = currentTransform === "none" ? 0 : new DOMMatrixReadOnly(currentTransform).m41
    // Use the same pixel coordinate space for keyframes and the resting style.
    // Avoid percentage transform reference-box conversion at animation handoff.
    const target = `translate3d(${visualIndex * width}px, 0, 0)`
    const from = `translate3d(${currentX}px, 0, 0)`

    indicatorAnimation.current?.cancel()
    indicatorAnimation.current = null
    // The underlying style and last keyframe are identical. No finish callback,
    // React update or commitStyles handoff can snap the final frame into place.
    indicator.style.transform = target
    if (initialized.current && width > 0 && Math.abs(currentX - visualIndex * width) > 0.01 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      indicatorAnimation.current = indicator.animate(
        [{ transform: from }, { transform: target }],
        { duration: 520, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)" }
      )
    }
    if (width > 0) initialized.current = true
  }, [dragging, visualIndex, indicatorWidth])

  // Keep the user's selection while navigation is pending. Reconcile only
  // after it settles, including back/forward, redirects and failed transitions.
  if (routeState.pathname !== pathname || routeState.isPending !== isPending) {
    setRouteState({ pathname, isPending })
    if (!isPending) setSelectedIndex(activeIndex)
  }

  function navigate(index: number) {
    setSelectedIndex(index)
    startTransition(() => {
      router.push(items[index].href)
    })
  }

  function resetGesture() {
    if (dragFrame.current !== null) {
      cancelAnimationFrame(dragFrame.current)
      dragFrame.current = null
    }
    gesture.current = null
    setPreview(null)
    setDragging(false)
  }

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    suppressPointerClick.current = false
    if (!event.isPrimary || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const index = Math.max(0, Math.min(items.length - 1,
      Math.floor((event.clientX - bounds.left) / (bounds.width / items.length))))
    gesture.current = { id: event.pointerId, x: event.clientX, width: bounds.width, startIndex: index, position: index, dragged: false }
    // Capture at the start, before the browser implicitly captures the link.
    event.currentTarget.setPointerCapture(event.pointerId)
    suppressPointerClick.current = true
    setPreview(index)
    router.prefetch(items[index].href)
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    const current = gesture.current
    if (!current || current.id !== event.pointerId) return
    if (!current.dragged && Math.abs(event.clientX - current.x) < 5) return
    if (!current.dragged) {
      // Pick up the moving glass at its rendered position, not its destination.
      const transform = indicatorRef.current && getComputedStyle(indicatorRef.current).transform
      current.startIndex = transform && transform !== "none"
        ? new DOMMatrixReadOnly(transform).m41 / (current.width / items.length)
        : current.startIndex
      // Freeze the visible frame before handing control to the finger.
      indicatorAnimation.current?.cancel()
      indicatorAnimation.current = null
      if (indicatorRef.current && transform) indicatorRef.current.style.transform = transform
      current.x = event.clientX
      current.dragged = true
      setDragging(true)
    }
    current.position = Math.max(0, Math.min(items.length - 1,
      current.startIndex + (event.clientX - current.x) / (current.width / items.length)))
    // Move only the compositor transform each frame. React updates the icons
    // only when the finger crosses into another item, not at every pixel.
    if (dragFrame.current === null) {
      dragFrame.current = requestAnimationFrame(() => {
        dragFrame.current = null
        const latest = gesture.current
        if (!latest?.dragged) return
        if (indicatorRef.current) {
          indicatorRef.current.style.transform = `translate3d(${latest.position * latest.width / items.length}px, 0, 0)`
        }
        setPreview(Math.round(latest.position))
      })
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLUListElement>) {
    const current = gesture.current
    if (!current || current.id !== event.pointerId) return
    if (current.dragged) {
      current.position = Math.max(0, Math.min(items.length - 1,
        current.startIndex + (event.clientX - current.x) / (current.width / items.length)))
    }
    navigate(Math.round(current.position))
    resetGesture()
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <nav aria-label="Điều hướng chính trên di động" className="mobile-bottom-nav md:hidden">
      <div className="mobile-bottom-nav-glass" data-dragging={dragging || undefined}>
        {visualIndex >= 0 && (
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="mobile-bottom-nav-indicator"
            style={{ transform: `translate3d(${Math.max(0, initialIndex) * 100}%, 0, 0)` }}
          />
        )}
        <ul
          className="relative grid grid-cols-5"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetGesture}
          onLostPointerCapture={(event) => {
            if (event.target === event.currentTarget) resetGesture()
          }}
          onClickCapture={(event) => {
            if (event.detail !== 0 && suppressPointerClick.current) {
              suppressPointerClick.current = false
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          {items.map(({ href, label, icon: Icon }, index) => (
            <li key={href} className="min-w-0">
              <Link
                href={href}
                aria-label={label}
                aria-current={index === activeIndex ? "page" : undefined}
                data-selected={index === Math.round(visualIndex) || undefined}
                draggable={false}
                prefetch={true}
                onNavigate={(event) => {
                  event.preventDefault()
                  navigate(index)
                }}
                className="mobile-bottom-nav-link"
              >
                <Icon aria-hidden="true" className="size-[22px] shrink-0" strokeWidth={index === Math.round(visualIndex) ? 2.25 : 1.75} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
