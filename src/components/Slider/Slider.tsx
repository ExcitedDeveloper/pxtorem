import "./Slider.css"

export type SliderProps = {
  onClick: () => void
}

const Slider = ({ onClick }: SliderProps) => {
  return (
    <label className='slider-switch'>
      <input type='checkbox' onClick={onClick} />
      <span className='slider-slider slider-round'></span>
    </label>
  )
}

export default Slider
