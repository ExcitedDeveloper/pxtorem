import { useEffect, useState } from "react"
import "./ConverterControls.css"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"

const PIXELS_LABEL = "Pixels"
const REM_LABEL = "Rem"

enum WhichControl {
  Left,
  Right,
}

const ConverterControls = () => {
  const { direction, setDirection, pixels, setPixels, rootFontSize } =
    useConverter()
  const [leftLabel, setLeftLabel] = useState(PIXELS_LABEL)
  const [rightLabel, setRightLabel] = useState(REM_LABEL)
  const [leftControlText, setLeftControlText] = useState<string>()
  const [rightControlText, setRightControlText] = useState<string>()

  const pixelsToRem = (): string => {
    return (pixels / rootFontSize).toString()
  }

  useEffect(() => {
    if (direction === ConversionDirection.PxToRem) {
      setLeftLabel(PIXELS_LABEL)
      setRightLabel(REM_LABEL)
    } else {
      setLeftLabel(REM_LABEL)
      setRightLabel(PIXELS_LABEL)
    }
  }, [direction])

  useEffect(() => {
    if (direction === ConversionDirection.PxToRem) {
      setLeftControlText(pixels.toString())
      setRightControlText(pixelsToRem())
    } else {
      setLeftControlText(pixelsToRem())
      setRightControlText(pixels.toString())
    }
  }, [pixels, direction])

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
          <input
            type='text'
            className='converter-controls-input'
            value={leftControlText}
          />
        </div>
      </label>
      <div className='converter-controls-toggle'>
        <button onClick={toggleDirection}>⇄</button>
      </div>
      <label htmlFor=''>
        {rightLabel}
        <div className='converter-controls-numeric'>
          <input
            type='text'
            className='converter-controls-input'
            value={rightControlText}
          />
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
