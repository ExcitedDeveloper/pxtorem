import { useEffect, useState } from "react"
import "./ConverterControls.css"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"

const PIXELS_LABEL = "Pixels"
const REM_LABEL = "Rem"

const ConverterControls = () => {
  const { direction, setDirection } = useConverter()
  const [leftLabel, setLeftLabel] = useState(PIXELS_LABEL)
  const [rightLabel, setRightLabel] = useState(REM_LABEL)

  useEffect(() => {
    if (direction === ConversionDirection.PxToRem) {
      setLeftLabel(PIXELS_LABEL)
      setRightLabel(REM_LABEL)
    } else {
      setLeftLabel(REM_LABEL)
      setRightLabel(PIXELS_LABEL)
    }
  }, [direction])

  const toggleDirection = () => {
    setDirection(
      direction === ConversionDirection.PxToRem
        ? ConversionDirection.RemToPx
        : ConversionDirection.PxToRem
    )
  }

  return (
    <div className='converter-controls'>
      <label htmlFor=''>
        {leftLabel}
        <div className='converter-controls-numeric'>
          <input type='text' className='converter-controls-input' />
        </div>
      </label>
      <div className='converter-controls-toggle'>
        <button onClick={toggleDirection}>⇄</button>
      </div>
      <label htmlFor=''>
        {rightLabel}
        <div className='converter-controls-numeric'>
          <input type='text' className='converter-controls-input' />
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
