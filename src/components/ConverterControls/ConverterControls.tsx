import { ChangeEvent, useEffect, useState, useRef } from "react"
import "./ConverterControls.css"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"
import { useTheme } from "../../contexts/Theme/Theme.context"
import { ThemeType } from "../../contexts/Theme/Theme.model"

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
  const { themeType } = useTheme()
  const [leftLabel, setLeftLabel] = useState(PIXELS_LABEL)
  const [rightLabel, setRightLabel] = useState(REM_LABEL)
  const [leftControlText, setLeftControlText] = useState<string>("")
  const [rightControlText, setRightControlText] = useState<string>("")
  const leftRef = useRef<HTMLInputElement>(null)
  const rightRef = useRef<HTMLInputElement>(null)
  const leftClipboardRef = useRef<HTMLImageElement>(null)
  const rightClipboardRef = useRef<HTMLImageElement>(null)

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

  // Have one clipboard icon which doesn't display
  // correctly for both light and dark modes.
  // Use classes that do a filter: invert to make
  // icon look correct for the current theme.
  useEffect(() => {
    if (themeType == ThemeType.Light) {
      leftClipboardRef.current &&
        leftClipboardRef.current.classList.remove("cc-invert-100")
      leftClipboardRef.current &&
        leftClipboardRef.current.classList.add("cc-invert-0")
      rightClipboardRef.current &&
        rightClipboardRef.current.classList.remove("cc-invert-100")
      rightClipboardRef.current &&
        rightClipboardRef.current.classList.add("cc-invert-0")
    } else {
      leftClipboardRef.current &&
        leftClipboardRef.current.classList.remove("cc-invert-0")
      leftClipboardRef.current &&
        leftClipboardRef.current.classList.add("cc-invert-100")
      rightClipboardRef.current &&
        rightClipboardRef.current.classList.remove("cc-invert-0")
      rightClipboardRef.current &&
        rightClipboardRef.current.classList.add("cc-invert-100")
    }
  }, [themeType])

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

  const getClipboardText = (side: WhichSide, val?: string) => {
    if (!val) return ``

    if (side === WhichSide.Left) {
      if (direction === ConversionDirection.PxToRem) {
        return `${val}px`
      } else {
        return `${val}rem`
      }
    } else {
      if (direction === ConversionDirection.PxToRem) {
        return `${val}rem`
      } else {
        return `${val}px`
      }
    }
  }

  return (
    <div className='converter-controls'>
      <label htmlFor=''>
        {leftLabel}

        <div className='cc-numeric'>
          <div className='cc-input-group'>
            <input
              type='number'
              ref={leftRef}
              className='cc-input cc-icon-rtl'
              defaultValue={leftControlText}
              onChange={(e) => handleOnChange(e, WhichSide.Left)}
            />
            <img
              src='copy_clipboard.png'
              ref={leftClipboardRef}
              alt='Copy to clipboard'
              className='cc-clipboard'
              onClick={() =>
                navigator.clipboard.writeText(
                  getClipboardText(WhichSide.Left, leftRef.current?.value)
                )
              }
            />
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
            <input
              type='number'
              ref={rightRef}
              className='cc-input cc-icon-rtl'
              defaultValue={rightControlText}
              onChange={(e) => handleOnChange(e, WhichSide.Right)}
            />
            <img
              src='copy_clipboard.png'
              ref={rightClipboardRef}
              alt='Copy to clipboard'
              className='cc-clipboard'
              onClick={() =>
                navigator.clipboard.writeText(
                  getClipboardText(WhichSide.Right, rightRef.current?.value)
                )
              }
            />
          </div>
        </div>
      </label>
    </div>
  )
}

export default ConverterControls
