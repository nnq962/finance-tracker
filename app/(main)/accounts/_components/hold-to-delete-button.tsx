"use client"

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react"

import { AlertDialogAction } from "@/components/ui/alert-dialog"

const HOLD_DURATION_MS = 3000
const RESET_DURATION_MS = 400

type HoldToDeleteButtonProps = {
  accountLabel: string
  onConfirm: () => void
}

export function HoldToDeleteButton({
  accountLabel,
  onConfirm,
}: HoldToDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)

  const cancelHold = () => {
    setIsHolding(false)
  }

  const startHold = () => {
    setIsHolding(true)
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return

    event.currentTarget.setPointerCapture(event.pointerId)
    startHold()
  }

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    cancelHold()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) {
      event.preventDefault()
      startHold()
    }
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      cancelHold()
    }
  }

  useEffect(() => {
    if (!isHolding && progressRef.current <= 0) return

    let animationFrameId: number
    let previousFrameTime: number | null = null

    const updateProgress = (currentFrameTime: number) => {
      if (previousFrameTime === null) {
        previousFrameTime = currentFrameTime
        animationFrameId = requestAnimationFrame(updateProgress)
        return
      }

      const elapsedTime = currentFrameTime - previousFrameTime
      const duration = isHolding ? HOLD_DURATION_MS : RESET_DURATION_MS
      const direction = isHolding ? 1 : -1
      const nextProgress = Math.min(
        1,
        Math.max(
          0,
          progressRef.current + direction * (elapsedTime / duration)
        )
      )

      previousFrameTime = currentFrameTime
      progressRef.current = nextProgress
      setProgress(nextProgress)

      if (isHolding && nextProgress >= 1) {
        setIsHolding(false)
        onConfirm()
        return
      }

      if (!isHolding && nextProgress <= 0) return

      animationFrameId = requestAnimationFrame(updateProgress)
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isHolding, onConfirm])

  return (
    <AlertDialogAction
      variant="destructive"
      className="relative isolate touch-none overflow-hidden"
      aria-label={`Nhấn giữ 3 giây để xóa ${accountLabel}`}
      onBlur={cancelHold}
      onClick={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onLostPointerCapture={cancelHold}
      onPointerCancel={cancelHold}
      onPointerDown={handlePointerDown}
      onPointerLeave={cancelHold}
      onPointerUp={handlePointerUp}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 origin-left bg-destructive/20 will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
      <span className="relative z-10">
        {isHolding ? "Tiếp tục giữ..." : "Xoá"}
      </span>
    </AlertDialogAction>
  )
}
