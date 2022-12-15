import { useEffect, useRef } from "react"
import "./ThemeSlider.css"
import { ThemeType } from "../../contexts/Theme/Theme.model"
import { getInfoFromLocalStorage } from "../../util"

export type SliderProps = {
  onClick: () => void
}

const ThemeSlider = ({ onClick }: SliderProps) => {
  const themeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const curr = getInfoFromLocalStorage()

    if (curr.currentTheme === ThemeType.Dark && themeRef.current) {
      themeRef.current.checked = true
    }
  }, [])

  return (
    <label className='slider-switch'>
      <input ref={themeRef} type='checkbox' onClick={onClick} />
      <span
        className='slider-slider slider-round'
        data-on='Dark'
        data-off='Light'
      ></span>
    </label>
  )
}

export default ThemeSlider
