import { ChangeEvent, useEffect, useState, useRef } from "react"
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
  const leftRef = useRef<HTMLInputElement>(null)
  const rightRef = useRef<HTMLInputElement>(null)

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

      // For the number that is getting converted,
      // set the text color
      // First remove the text color from the other number
      if (ctrl === WhichSide.Left) {
        leftRef.current &&
          leftRef.current.classList.remove("cc-converted-number")
        rightRef.current &&
          rightRef.current.classList.add("cc-converted-number")
      } else {
        rightRef.current &&
          rightRef.current.classList.remove("cc-converted-number")
        leftRef.current && leftRef.current.classList.add("cc-converted-number")
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
        <div className='cc-numeric'>
          <input
            type='number'
            ref={leftRef}
            className='cc-input cc-icon-rtl'
            defaultValue={leftControlText}
            onChange={(e) => handleOnChange(e, WhichSide.Left)}
          />
        </div>
      </label>
      <div className='cc-toggle'>
        <button onClick={toggleDirection}>⇄</button>
      </div>
      <label htmlFor=''>
        {rightLabel}
        <div className='cc-numeric'>
          <input
            type='number'
            ref={rightRef}
            className='cc-input cc-icon-rtl'
            defaultValue={rightControlText}
            onChange={(e) => handleOnChange(e, WhichSide.Right)}
          />
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
