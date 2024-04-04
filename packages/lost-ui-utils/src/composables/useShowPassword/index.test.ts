import { describe, expect, it } from 'vitest'
import { useShowPassword } from '.'

describe('useShowPassword', () => {
  it('should be defined', () => {
    expect(useShowPassword).toBeDefined()
  })

  it('should return password by default', () => {
    const { type } = useShowPassword()
    expect(type.value).toBe('password')
  })

  it('should return text after call toggle and back and forth', () => {
    const { type, toggle } = useShowPassword()
    toggle()
    expect(type.value).toBe('text')
    toggle()
    expect(type.value).toBe('password')
  })
})
