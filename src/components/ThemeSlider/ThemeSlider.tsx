import { useEffect, useRef } from 'react'
import './ThemeSlider.css'
import { ThemeType } from '../../contexts/Theme/Theme.model'
import { getCurrentThemeFromLocalStorage } from '../../util'

export type SliderProps = {
  onClick: () => void
}

const ThemeSlider = ({ onClick }: SliderProps) => {
  const themeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const theme = getCurrentThemeFromLocalStorage()

    if (theme === ThemeType.Dark && themeRef.current) {
      themeRef.current.checked = true
    }
  }, [])

  return (
    <label htmlFor="themeSlider" className="theme-toggle">
      <input
        id="themeSlider"
        ref={themeRef}
        type="checkbox"
        onClick={onClick}
        aria-label="Toggle dark mode"
      />
      <div className="toggle-track">
        <div className="toggle-thumb">
          <svg className="sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg className="moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </label>
  )
}

export default ThemeSlider
