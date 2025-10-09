import { useToast } from 'primevue/usetoast'

export function useAppToast() {
  const toast = useToast()
  const showToast = (severity: 'success' | 'info' | 'warn' | 'error', detail: string, summary?: string) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 3000
    })
  }
  return { showToast }
}
