"use client"

import { Toast } from "./toast"
import { useToast } from "../../hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-6 max-h-screen w-full sm:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => dismiss(toast.id)}
          className="float-right"
        />
      ))}
    </div>
  )
}
