import { useToggle } from '@vueuse/core'

export function useShowPassword() {
  const [value, toggle] = useToggle('password', { truthyValue: 'password', falsyValue: 'text' })

  return {
    type: value,
    toggle,
  }
}
