import { ChangeEvent, RefObject, useState, useEffect } from 'react'
import { WhichSide, formatNumber, pxToRem, remToPx } from '../../util'
import {
  ConversionDirection,
  useConverter,
} from '../../contexts/Converter/Converter.context'
import './ConversionInput.css'

export type ConversionInputProps = {
  inputRef: RefObject<HTMLInputElement>
  side: WhichSide
}

const ConversionInput = ({ inputRef, side }: ConversionInputProps) => {
  const [controlText, setControlText] = useState<string>('')
  const { setPixels, rootFontSize, pixels, direction } = useConverter()

  useEffect(() => {
    if (
      (side === WhichSide.Left && direction === ConversionDirection.PxToRem) ||
      (side === WhichSide.Right && direction === ConversionDirection.RemToPx)
    ) {
      setControlText(formatNumber(pixels))
    } else {
      setControlText(pxToRem(rootFontSize, pixels))
    }
  }, [pixels, direction, side, rootFontSize])

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    ctrl: WhichSide
  ) => {
    try {
      if (!e.target.value) {
        setControlText('')
        setPixels(undefined)
        return
      }

      // For the number that is getting converted,
      // set the text color
      // First remove the text color from the other number
      if (ctrl === WhichSide.Left) {
        inputRef.current?.classList.remove('conv-converted-number')
      } else {
        inputRef.current?.classList.add('conv-converted-number')
      }

      if (ctrl === WhichSide.Left) {
        if (direction === ConversionDirection.PxToRem) {
          // Left and PxToRem, entered value is in px.
          // Set pixels to entered value
          setPixels(Number(e.target.value))
        } else {
          // Left and RemToPx, entered value is in rem.
          // Convert to px and update pixels
          setPixels(Number(remToPx(rootFontSize, Number(e.target.value))))
        }
      } else if (direction === ConversionDirection.PxToRem) {
        // Right and PxToRem, entered value is in rem.
        // Convert to px and update pixels
        setPixels(Number(remToPx(rootFontSize, Number(e.target.value))))
      } else {
        // Right and RemToPx, entered value is in px.
        // Set pixels to entered value
        setPixels(Number(e.target.value))
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`handleOnChange`, error)
    }
  }

  return (
    <input
      type="number"
      ref={inputRef}
      className="conv-input"
      defaultValue={controlText}
      onChange={(e) => handleOnChange(e, side)}
    />
  )
}

export default ConversionInput
