"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "../../hooks/use-toast"

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  className?: string
  onClose?: () => void
}

export function Toast({ 
  title, 
  description, 
  variant = 'default',
  className,
  onClose,
}: ToastProps) {
  const [progress, setProgress] = React.useState(100)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    if (progress === 0) {
      onClose?.()
    }
  }, [progress, onClose])

  return (
    <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-6 max-h-screen w-full sm:max-w-[420px]">
      <div
      className={cn(
        "relative overflow-hidden rounded-lg border shadow-lg transition-all",
        "backdrop-blur-sm bg-opacity-95",
        variant === 'destructive' 
          ? 'bg-red-50 border-red-100 text-red-900' 
          : 'bg-white/95 border-gray-100',
        "animate-enter hover:translate-y-0.5 hover:shadow-xl",
        className
      )}
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Progress bar */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-1",
          variant === 'destructive' ? 'bg-red-500' : 'bg-blue-500'
        )}
        style={{ 
          width: `${progress}%`,
          transition: 'width 30ms linear'
        }}
      />

      <div className="flex justify-between items-start gap-2 p-4">
        <div className="flex-1">
          {title && (
            <h4 className={cn(
              "text-sm font-medium mb-1",
              variant === 'destructive' ? 'text-red-900' : 'text-gray-900'
            )}>
              {title}
            </h4>
          )}
          {description && (
            <p className={cn(
              "text-sm",
              variant === 'destructive' ? 'text-red-800/90' : 'text-gray-600/90'
            )}>
              {description}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              "rounded-md p-1 transition-colors",
              variant === 'destructive' 
                ? 'text-red-600 hover:bg-red-100' 
                : 'text-gray-400 hover:bg-gray-100'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
    </div>
  )
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => dismiss(toast.id)}
        />
      ))}
    </>
  )
}
