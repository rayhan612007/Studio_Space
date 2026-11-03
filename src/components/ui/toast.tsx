"use client"

import { toast as sonnerToast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning" | "loading"

type ToastNotification = {
  title: string
  description?: string
  type?: ToastType
}

export const toast = {
  add({ title, description, type = "info" }: ToastNotification) {
    switch (type) {
      case "success":
        sonnerToast.success(title, { description })
        break
      case "error":
        sonnerToast.error(title, { description })
        break
      case "warning":
        sonnerToast.warning(title, { description })
        break
      case "loading":
        sonnerToast.loading(title, { description })
        break
      default:
        sonnerToast.info(title, { description })
    }
  },
}
