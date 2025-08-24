import { describe, it, expect, beforeEach } from 'vitest'
import {
  formatNumber,
  pxToRem,
  remToPx,
  getCurrentThemeFromLocalStorage,
  getRootFontSizeFromLocalStorage,
  DFLT_ROOT_FONT_SIZE,
} from './util'
import { ThemeType } from './contexts/Theme/Theme.model'

describe('formatNumber', () => {
  it('should format a number with default 3 decimal places', () => {
    expect(formatNumber(16.12345)).toBe('16.123')
  })

  it('should format a number with specified decimal places', () => {
    expect(formatNumber(16.12345, 2)).toBe('16.12')
  })

  it('should remove trailing zeros', () => {
    expect(formatNumber(16.0, 3)).toBe('16')
    expect(formatNumber(16.1, 3)).toBe('16.1')
  })

  it('should handle undefined input', () => {
    expect(formatNumber(undefined)).toBe('')
  })

  it('should handle zero', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('pxToRem', () => {
  it('should convert pixels to rem correctly', () => {
    expect(pxToRem(16, 16)).toBe('1')
    expect(pxToRem(16, 32)).toBe('2')
    expect(pxToRem(16, 8)).toBe('0.5')
  })

  it('should handle decimal values', () => {
    expect(pxToRem(16, 24, 2)).toBe('1.5')
  })

  it('should handle undefined pixels', () => {
    expect(pxToRem(16, undefined)).toBe('')
  })

  it('should handle different root font sizes', () => {
    expect(pxToRem(20, 40)).toBe('2')
    expect(pxToRem(10, 15)).toBe('1.5')
  })

  it('should respect decimal places parameter', () => {
    expect(pxToRem(16, 17, 1)).toBe('1.1')
    expect(pxToRem(16, 17, 4)).toBe('1.0625')
  })
})

describe('remToPx', () => {
  it('should convert rem to pixels correctly', () => {
    expect(remToPx(16, 1)).toBe('16')
    expect(remToPx(16, 2)).toBe('32')
    expect(remToPx(16, 0.5)).toBe('8')
  })

  it('should handle decimal values', () => {
    expect(remToPx(16, 1.5, 2)).toBe('24')
  })

  it('should handle different root font sizes', () => {
    expect(remToPx(20, 2)).toBe('40')
    expect(remToPx(10, 1.5)).toBe('15')
  })

  it('should respect decimal places parameter', () => {
    expect(remToPx(16, 1.0625, 1)).toBe('17')
    expect(remToPx(16, 1.0625, 4)).toBe('17')
  })

  it('should remove trailing zeros', () => {
    expect(remToPx(16, 1.0)).toBe('16')
  })
})

describe('getCurrentThemeFromLocalStorage', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear()
  })

  it('should return stored theme from localStorage', () => {
    localStorage.getItem.mockReturnValue(ThemeType.Dark)
    expect(getCurrentThemeFromLocalStorage()).toBe(ThemeType.Dark)
  })

  it('should return light theme if no stored theme', () => {
    localStorage.getItem.mockReturnValue(null)
    expect(getCurrentThemeFromLocalStorage()).toBe(ThemeType.Light)
  })

  it('should return light theme if localStorage throws error', () => {
    localStorage.getItem.mockImplementation(() => {
      throw new Error('Storage error')
    })
    expect(getCurrentThemeFromLocalStorage()).toBe(ThemeType.Light)
  })
})

describe('getRootFontSizeFromLocalStorage', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear()
  })

  it('should return stored root font size from localStorage', () => {
    localStorage.getItem.mockReturnValue('18')
    expect(getRootFontSizeFromLocalStorage()).toBe(18)
  })

  it('should return default font size if no stored value', () => {
    localStorage.getItem.mockReturnValue(null)
    expect(getRootFontSizeFromLocalStorage()).toBe(DFLT_ROOT_FONT_SIZE)
  })

  it('should handle non-numeric values', () => {
    localStorage.getItem.mockReturnValue('invalid')
    expect(getRootFontSizeFromLocalStorage()).toBe(NaN)
  })
})
