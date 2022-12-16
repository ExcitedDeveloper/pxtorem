import { ChangeEvent, useEffect, useState } from "react"
import "./ConverterControls.css"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"

const PIXELS_LABEL = "Pixels"
const REM_LABEL = "Rem"

enum WhichSide {
  Left,
  Right,
}

const formatNumber = (num: number | undefined) => {
  return num ? num.toFixed(3).replace(/\.?0+$/, "") : ""
}

const ConverterControls = () => {
  const { direction, setDirection, pixels, setPixels, rootFontSize } =
    useConverter()
  const [leftLabel, setLeftLabel] = useState(PIXELS_LABEL)
  const [rightLabel, setRightLabel] = useState(REM_LABEL)
  const [leftControlText, setLeftControlText] = useState<string>("")
  const [rightControlText, setRightControlText] = useState<string>("")

  const pixelsToRem = (): string => {
    return pixels ? formatNumber(pixels / rootFontSize) : ""
  }

  const remToPixels = (rem: number): number => {
    return rem * rootFontSize
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
      setLeftControlText(formatNumber(pixels))
      setRightControlText(pixelsToRem())
    } else {
      setLeftControlText(pixelsToRem())
      setRightControlText(formatNumber(pixels))
    }
  }, [pixels, direction])

  const toggleDirection = () => {
    setDirection(
      direction === ConversionDirection.PxToRem
        ? ConversionDirection.RemToPx
        : ConversionDirection.PxToRem
    )
  }

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    ctrl: WhichSide
  ) => {
    try {
      if (!e.target.value) {
        setLeftControlText("")
        setRightControlText("")
        setPixels(undefined)
        return
      }

      if (
        (ctrl === WhichSide.Left &&
          direction === ConversionDirection.PxToRem) ||
        (ctrl === WhichSide.Right && direction === ConversionDirection.RemToPx)
      ) {
        setPixels(Number(e.target.value))
      } else {
        setPixels(remToPixels(Number(e.target.value)))
      }
    } catch (error) {
      console.error(`handleOnChange`, error)
    }
  }

  return (
    <div className='converter-controls'>
      <label htmlFor=''>
        {leftLabel}
        <div className='converter-controls-numeric'>
          <input
            type='number'
            className='converter-controls-input'
            defaultValue={leftControlText}
            onChange={(e) => handleOnChange(e, WhichSide.Left)}
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
            type='number'
            className='converter-controls-input'
            defaultValue={rightControlText}
            onChange={(e) => handleOnChange(e, WhichSide.Right)}
          />
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
