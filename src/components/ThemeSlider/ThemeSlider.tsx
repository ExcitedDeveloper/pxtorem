import "./ThemeSlider.css"

export type SliderProps = {
  onClick: () => void
}

const ThemeSlider = ({ onClick }: SliderProps) => {
  return (
    <label className='slider-switch'>
      <input type='checkbox' onClick={onClick} />
      <span
        className='slider-slider slider-round'
        data-on='Dark'
        data-off='Light'
      ></span>
    </label>
  )
}

export default ThemeSlider
