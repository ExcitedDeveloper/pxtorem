/* eslint-disable prettier/prettier */
import { RefObject } from 'react'
import {
  ConversionDirection,
  useConverter,
} from '../../contexts/Converter/Converter.context'
import { WhichSide } from '../../util'
import InvertableImage from '../InvertableImage/InvertableImage'
import './ClipboardImage.css'

export type ClipboardImageProps = {
  side: WhichSide
  inputRef: RefObject<HTMLInputElement>
}

const ClipboardImage = ({ side, inputRef }: ClipboardImageProps) => {
  const { direction } = useConverter()

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
      <InvertableImage src="copy_clipboard.png" alt="Copy to clipboard" />
    </button>
  )
}

export default ClipboardImage
