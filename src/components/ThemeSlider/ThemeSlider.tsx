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
    <label htmlFor="themeSlider" className="slider-switch">
      <input
        id="themeSlider"
        ref={themeRef}
        type="checkbox"
        onClick={onClick}
      />
      <span
        className="slider-slider slider-round"
        data-on="Dark"
        data-off="Light"
      />
    </label>
  )
}

export default ThemeSlider
