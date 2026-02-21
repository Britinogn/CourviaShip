import type { Ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number // optional auto-dismiss in ms
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  const show = (message: string, type: Toast['type'] = 'info', duration = 4000) => {
    const id = toastId++
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id // return id if you ever need to remove it manually
  }

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  // Convenience methods
  const success = (message: string, duration = 4000) => show(message, 'success', duration)
  const error   = (message: string, duration = 5000) => show(message, 'error', duration)
  const info    = (message: string, duration = 4000) => show(message, 'info', duration)
  const warning = (message: string, duration = 5000) => show(message, 'warning', duration)

  return {
    toasts: readonly(toasts) as Ref<readonly Toast[]>,
    show,
    remove,
    success,
    error,
    info,
    warning
  }
}