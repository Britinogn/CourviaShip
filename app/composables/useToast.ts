import type {Toast} from '~/types'

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
    const show = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
        const id = toastId++
        toasts.value.push({ id, message, type })

        setTimeout(() => {
            remove(id)
        }, duration)
    }

    const remove = (id: number) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    const success = (message: string) => show(message, 'success')
    const error = (message: string) => show(message, 'error')
    const info = (message: string) => show(message, 'info')
    const warning = (message: string) => show(message, 'warning')

    return {
        toasts: readonly(toasts),
        show,
        remove,
        success,
        error,
        info,
        warning
    }
}