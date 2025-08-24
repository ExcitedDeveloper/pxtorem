import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './Theme.context'
import { ThemeType } from './Theme.model'
import { THEMES } from './Theme.config'

// Test component to use the theme context
const TestComponent = () => {
  const { themeType, theme, setCurrentTheme } = useTheme()

  return (
    <div>
      <div data-testid="theme-type">{themeType}</div>
      <div data-testid="primary-color">{theme['--primary']}</div>
      <button
        data-testid="toggle-theme"
        onClick={() =>
          setCurrentTheme(
            themeType === ThemeType.Light ? ThemeType.Dark : ThemeType.Light
          )
        }
      >
        Toggle Theme
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
  })

  it('should provide default light theme when no stored theme', () => {
    localStorage.getItem.mockReturnValue(null)

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-type')).toHaveTextContent(ThemeType.Light)
    expect(screen.getByTestId('primary-color')).toHaveTextContent(
      THEMES.light['--primary']
    )
  })

  it('should load stored theme from localStorage', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify(ThemeType.Dark))

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-type')).toHaveTextContent(ThemeType.Dark)
    expect(screen.getByTestId('primary-color')).toHaveTextContent(
      THEMES.dark['--primary']
    )
  })

  it('should update theme when setCurrentTheme is called', async () => {
    localStorage.getItem.mockReturnValue(null)

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-type')).toHaveTextContent(ThemeType.Light)

    await act(async () => {
      screen.getByTestId('toggle-theme').click()
    })

    expect(screen.getByTestId('theme-type')).toHaveTextContent(ThemeType.Dark)
    expect(screen.getByTestId('primary-color')).toHaveTextContent(
      THEMES.dark['--primary']
    )
  })

  it('should save theme to localStorage when theme changes', async () => {
    localStorage.getItem.mockReturnValue(null)

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    await act(async () => {
      screen.getByTestId('toggle-theme').click()
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'currentTheme',
      JSON.stringify(ThemeType.Dark)
    )
  })

  it('should provide correct theme object for each theme type', () => {
    // Test dark theme
    localStorage.getItem.mockReturnValue(JSON.stringify(ThemeType.Dark))

    const { unmount } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('primary-color')).toHaveTextContent(
      THEMES.dark['--primary']
    )

    unmount()

    // Test light theme with fresh render
    localStorage.getItem.mockReturnValue(JSON.stringify(ThemeType.Light))

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('primary-color')).toHaveTextContent(
      THEMES.light['--primary']
    )
  })
})
