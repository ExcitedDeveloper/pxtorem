import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
  })

  it('should return initial value when localStorage is empty', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('initial')
    expect(localStorage.getItem).toHaveBeenCalledWith('test-key')
  })

  it('should return stored value from localStorage', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    expect(result.current[0]).toBe('stored-value')
  })

  it('should update localStorage when value changes', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(result.current[0]).toBe('new-value')
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
  })

  it('should work with function updater', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify('initial'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    
    act(() => {
      result.current[1]((prev) => `${prev}-updated`)
    })
    
    expect(result.current[0]).toBe('initial-updated')
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('initial-updated'))
  })

  it('should handle localStorage read errors gracefully', () => {
    localStorage.getItem.mockImplementation(() => {
      throw new Error('Read error')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))
    
    expect(result.current[0]).toBe('fallback')
  })

  it('should handle localStorage write errors gracefully', () => {
    localStorage.getItem.mockReturnValue(null)
    localStorage.setItem.mockImplementation(() => {
      throw new Error('Write error')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    // Should still update state even if localStorage fails
    expect(result.current[0]).toBe('new-value')
  })

  it('should work with complex objects', () => {
    const initialObject = { count: 0, name: 'test' }
    const updatedObject = { count: 1, name: 'updated' }
    
    localStorage.getItem.mockReturnValue(JSON.stringify(initialObject))
    
    const { result } = renderHook(() => useLocalStorage('test-key', { count: -1, name: 'default' }))
    
    expect(result.current[0]).toEqual(initialObject)
    
    act(() => {
      result.current[1](updatedObject)
    })
    
    expect(result.current[0]).toEqual(updatedObject)
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(updatedObject))
  })

  it('should handle invalid JSON in localStorage', () => {
    localStorage.getItem.mockReturnValue('invalid-json{')
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))
    
    expect(result.current[0]).toBe('fallback')
  })

  it('should maintain referential stability of setter function', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    const firstSetter = result.current[1]
    
    rerender()
    
    const secondSetter = result.current[1]
    
    // The setter should be the same reference due to useCallback
    expect(firstSetter).toBe(secondSetter)
  })
})