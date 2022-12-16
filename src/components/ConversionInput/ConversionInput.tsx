import { ChangeEvent, RefObject, useState, useEffect } from "react"
import { WhichSide } from "../../util"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"
import "./ConversionInput.css"

export type ConversionInputProps = {
  inputRef: RefObject<HTMLInputElement>
  side: WhichSide
}

const formatNumber = (num: number | undefined) => {
  return num ? num.toFixed(3).replace(/\.?0+$/, "") : ""
}

const ConversionInput = ({ inputRef, side }: ConversionInputProps) => {
  const [controlText, setControlText] = useState<string>("")
  const { setPixels, rootFontSize, pixels, direction } = useConverter()

  const pixelsToRem = (): string => {
    return pixels ? formatNumber(pixels / rootFontSize) : ""
  }

  useEffect(() => {
    if (
      (side === WhichSide.Left && direction === ConversionDirection.PxToRem) ||
      (side === WhichSide.Right && direction === ConversionDirection.RemToPx)
    ) {
      setControlText(formatNumber(pixels))
    } else {
      setControlText(pixelsToRem())
    }
  }, [pixels, direction])

  const remToPixels = (rem: number): number => {
    return rem * rootFontSize
  }

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    ctrl: WhichSide
  ) => {
    try {
      if (!e.target.value) {
        setControlText("")
        setPixels(undefined)
        return
      }

      // For the number that is getting converted,
      // set the text color
      // First remove the text color from the other number
      if (ctrl === WhichSide.Left) {
        inputRef.current &&
          inputRef.current.classList.remove("conv-converted-number")
      } else {
        inputRef.current &&
          inputRef.current.classList.add("conv-converted-number")
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
    <input
      type='number'
      ref={inputRef}
      className='conv-input'
      defaultValue={controlText}
      onChange={(e) => handleOnChange(e, side)}
    />
  )
}

export default ConversionInput