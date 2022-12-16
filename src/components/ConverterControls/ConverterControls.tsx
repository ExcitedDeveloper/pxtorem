import { ChangeEvent, useEffect, useState, useRef } from "react"
import "./ConverterControls.css"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"
import { WhichSide } from "../../util"
import ClipboardImage from "../ClipboardImage/ClipboardImage"
import ConversionInput from "../ConversionInput/ConversionInput"

const PIXELS_LABEL = "Pixels"
const REM_LABEL = "Rem"

const ConverterControls = () => {
  const { direction, setDirection, rootFontSize } = useConverter()
  const [leftLabel, setLeftLabel] = useState(PIXELS_LABEL)
  const [rightLabel, setRightLabel] = useState(REM_LABEL)
  const leftRef = useRef<HTMLInputElement>(null)
  const rightRef = useRef<HTMLInputElement>(null)

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
        <div className='cc-numeric'>
          <div className='cc-input-group'>
            <ConversionInput inputRef={leftRef} side={WhichSide.Left} />
            <ClipboardImage
              side={WhichSide.Left}
              inputRef={leftRef}
            ></ClipboardImage>
          </div>
        </div>
      </label>
      <div className='cc-toggle'>
        <button onClick={toggleDirection}>⇄</button>
      </div>
      <label htmlFor=''>
        {rightLabel}
        <div className='cc-numeric'>
          <div className='cc-input-group'>
            <ConversionInput inputRef={rightRef} side={WhichSide.Right} />
            <ClipboardImage
              side={WhichSide.Right}
              inputRef={rightRef}
            ></ClipboardImage>
          </div>
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
