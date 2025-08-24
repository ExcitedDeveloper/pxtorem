import {
  ChangeEvent,
  RefObject,
  useState,
  useEffect,
  KeyboardEvent,
  useCallback,
} from 'react'
import { WhichSide, formatNumber, pxToRem, remToPx } from '../../util'
import {
  ConversionDirection,
  useConverter,
} from '../../contexts/Converter/Converter.context'
import './ConversionInput.css'

export interface ConversionInputProps {
  readonly inputRef: RefObject<HTMLInputElement>
  readonly side: WhichSide
  readonly otherRef: RefObject<HTMLInputElement>
}

const ConversionInput = ({
  inputRef,
  side,
  otherRef,
}: ConversionInputProps) => {
  const [controlText, setControlText] = useState<string>('')
  const { setPixels, rootFontSize, pixels, direction } = useConverter()

  useEffect(() => {
    // Don't update if this input currently has focus (user is typing)
    if (document.activeElement === inputRef.current) {
      return
    }

    if (!pixels) {
      setControlText('')
      return
    }

    if (
      (side === WhichSide.Left && direction === ConversionDirection.PxToRem) ||
      (side === WhichSide.Right && direction === ConversionDirection.RemToPx)
    ) {
      setControlText(formatNumber(pixels))
    } else {
      setControlText(pxToRem(rootFontSize, pixels))
    }
  }, [pixels, direction, side, rootFontSize])

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, ctrl: WhichSide) => {
      try {
        const inputValue = e.target.value

        // Update the control text immediately for responsive UI
        setControlText(inputValue)

        if (!inputValue) {
          setPixels(undefined)
          return
        }

        // Unhighlight the current input
        inputRef.current?.classList.remove('conv-converted-number')

        // Highlight the other input to show its'
        // value has been converted
        otherRef.current?.classList.add('conv-converted-number')

        if (ctrl === WhichSide.Left) {
          if (direction === ConversionDirection.PxToRem) {
            // Left and PxToRem, entered value is in px.
            // Set pixels to entered value
            setPixels(Number(inputValue))
          } else {
            // Left and RemToPx, entered value is in rem.
            // Convert to px and update pixels
            setPixels(Number(remToPx(rootFontSize, Number(inputValue))))
          }
        } else if (direction === ConversionDirection.PxToRem) {
          // Right and PxToRem, entered value is in rem.
          // Convert to px and update pixels
          setPixels(Number(remToPx(rootFontSize, Number(inputValue))))
        } else {
          // Right and RemToPx, entered value is in px.
          // Set pixels to entered value
          setPixels(Number(inputValue))
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`handleOnChange`, error)
      }
    },
    [direction, rootFontSize, setPixels, inputRef, otherRef]
  )

  // Was getting bug where selecting text and then
  // clicking the delete key, was not working correctly
  // in handleOnChange.
  //
  // Apparently browser was not having enough time
  // to update e.target.value.  Added setTimeout
  // to so that e.target.value has time to update.
  //
  // Found solution in the accepted answer at
  // https://stackoverflow.com/questions/1338483/detecting-value-of-input-text-field-after-a-keydown-event-in-the-text-field
  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      window.setTimeout(() => {
        const target = e.target as HTMLInputElement
        if (!target.value) {
          setControlText('')
          setPixels(undefined)
        }
      })
    },
    [setPixels]
  )

  return (
    <input
      type="number"
      ref={inputRef}
      className="conv-input"
      value={controlText}
      onKeyDown={(e) => handleOnKeyDown(e)}
      onChange={(e) => handleOnChange(e, side)}
    />
  )
}

export default ConversionInput
