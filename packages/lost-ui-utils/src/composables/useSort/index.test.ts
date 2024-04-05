import { describe, expect, it } from 'vitest'
import { SortDirection, useSort } from '.'

describe('useShowPassword', () => {
  it('should be defined', () => {
    expect(useSort).toBeDefined()
  })

  it('should return correct order after call change function', () => {
    const data = [{ id: 0 }, { id: 2 }, { id: 1 }]
    const { state, change } = useSort(data)

    expect(state.value).toStrictEqual([{ id: 0 }, { id: 2 }, { id: 1 }])

    change({ sortTarget: 'id', orders: SortDirection.ASCEND })
    expect(state.value).toStrictEqual([{ id: 0 }, { id: 1 }, { id: 2 }])

    change({ sortTarget: 'id', orders: SortDirection.ASCEND })
    expect(state.value).toStrictEqual([{ id: 2 }, { id: 1 }, { id: 0 }])

    change({ sortTarget: 'id', orders: SortDirection.ASCEND })
    expect(state.value).toStrictEqual([{ id: 0 }, { id: 2 }, { id: 1 }])
  })

  it('should return correct order if has initial sort', () => {
    const data = [{ id: 0 }, { id: 2 }, { id: 1 }]
    const initialSort = { sortTarget: 'id', orders: SortDirection.ASCEND }
    const { state } = useSort(data, { initialSort })

    expect(state.value).toStrictEqual([{ id: 0 }, { id: 1 }, { id: 2 }])
  })

  it('should return correct order if orders is SortObject', () => {
    const data = [{ id: 0 }, { id: 2 }, { id: 1 }]
    const initialSort = { sortTarget: 'id', orders: SortDirection.DESCEND }
    const { state } = useSort(data, { initialSort })

    expect(state.value).toStrictEqual([{ id: 2 }, { id: 1 }, { id: 0 }])
  })

  it('should return correct order if orders is object', () => {
    const data = [{ id: 0 }, { id: 2 }, { id: 1 }]
    const initialSort = { sortTarget: 'id', orders: { target: 'id', direction: SortDirection.DESCEND } }
    const { state } = useSort(data, { initialSort })

    expect(state.value).toStrictEqual([{ id: 2 }, { id: 1 }, { id: 0 }])
  })

  it('should return correct order if orders is array', () => {
    const data = [{ id: 0 }, { id: 2 }, { id: 1 }]
    const initialSort = { sortTarget: 'id', orders: [{ target: 'id', direction: SortDirection.DESCEND }] }
    const { state } = useSort(data, { initialSort })

    expect(state.value).toStrictEqual([{ id: 2 }, { id: 1 }, { id: 0 }])
  })

  it('should return correct order if locale is en', () => {
    const data = [{ name: 'Z' }, { name: 'a' }, { name: 'z' }, { name: 'ä' }]
    const initialSort = { sortTarget: 'id', orders: [{ target: 'name', direction: SortDirection.ASCEND }] }
    const { state } = useSort(data, { initialSort })

    expect(state.value).toStrictEqual([{ name: 'a' }, { name: 'ä' }, { name: 'z' }, { name: 'Z' }])
  })

  it('should return correct order if locale is sv', () => {
    const data = [{ name: 'Z' }, { name: 'a' }, { name: 'z' }, { name: 'ä' }]
    const initialSort = { sortTarget: 'id', orders: [{ target: 'name', direction: SortDirection.ASCEND }] }
    const { state } = useSort(data, { initialSort, locale: 'sv' })

    expect(state.value).toStrictEqual([{ name: 'a' }, { name: 'z' }, { name: 'Z' }, { name: 'ä' }])
  })
})
