/* eslint-disable prettier/prettier */
import { RefObject, useRef, useEffect } from 'react'
import {
  ConversionDirection,
  useConverter,
} from '../../contexts/Converter/Converter.context'
import { WhichSide } from '../../util'
import { useTheme } from '../../contexts/Theme/Theme.context'
import { ThemeType } from '../../contexts/Theme/Theme.model'
import './ClipboardImage.css'

export type ClipboardImageProps = {
  side: WhichSide
  inputRef: RefObject<HTMLInputElement>
}

const ClipboardImage = ({ side, inputRef }: ClipboardImageProps) => {
  const { direction } = useConverter()
  const imgRef = useRef<HTMLImageElement>(null)
  const { themeType } = useTheme()

  // Have one clipboard icon which doesn't display
  // correctly for both light and dark modes.
  // Use classes that do a filter: invert to make
  // icon look correct for the current theme.
  useEffect(() => {
    if (themeType === ThemeType.Light) {
      imgRef.current?.classList.remove('ci-invert-100')
      imgRef.current?.classList.add('ci-invert-0')
    } else {
      imgRef.current?.classList.remove('ci-invert-0')
      imgRef.current?.classList.add('ci-invert-100')
    }
  }, [themeType])

  const getClipboardText = () => {
    if (!inputRef.current || !inputRef.current.value) return ``

    const val = inputRef.current.value

    if (side === WhichSide.Left) {
      if (direction === ConversionDirection.PxToRem) {
        return `${val}px`
      }
      return `${val}rem`
    }
    if (direction === ConversionDirection.PxToRem) {
      return `${val}rem`
    }
    return `${val}px`
  }

  return (
    <button
      type="button"
      className="ci-clipboard"
      onClick={() => navigator.clipboard.writeText(getClipboardText())}
    >
      <img src="copy_clipboard.png" ref={imgRef} alt="Copy to clipboard" />
    </button>
  )
}

export default ClipboardImage
