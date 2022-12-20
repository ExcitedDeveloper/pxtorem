import { useEffect, useState, useRef } from 'react'
import './ConverterControls.css'
import {
  ConversionDirection,
  useConverter,
} from '../../contexts/Converter/Converter.context'
import { WhichSide } from '../../util'
import ClipboardImage from '../ClipboardImage/ClipboardImage'
import ConversionInput from '../ConversionInput/ConversionInput'

const PIXELS_LABEL = 'Pixels'
const REM_LABEL = 'Rem'

const ConverterControls = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="converter-controls">
      <label htmlFor="leftConverterControl">
        {leftLabel}
        <div id="leftConverterControl" className="cc-numeric">
          <div className="cc-input-group">
            <ConversionInput
              inputRef={leftRef}
              side={WhichSide.Left}
              otherRef={rightRef}
            />
            <ClipboardImage side={WhichSide.Left} inputRef={leftRef} />
          </div>
        </div>
      </label>
      <div className="cc-toggle">
        <button
          className="cc-toggle-button"
          type="button"
          onClick={toggleDirection}
        >
          ⇄
        </button>
      </div>
      <label htmlFor="rightConverterControl">
        {rightLabel}
        <div id="rightConverterControl" className="cc-numeric">
          <div className="cc-input-group">
            <ConversionInput
              inputRef={rightRef}
              side={WhichSide.Right}
              otherRef={leftRef}
            />
            <ClipboardImage side={WhichSide.Right} inputRef={rightRef} />
          </div>
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
