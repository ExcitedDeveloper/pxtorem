import { FormEvent, useRef, useEffect } from 'react'
import InvertableImage from '../InvertableImage/InvertableImage'
import { useConverter } from '../../contexts/Converter/Converter.context'
import { getRootFontSizeFromLocalStorage, ROOT_FONT_SIZE } from '../../util'
import './FontSizeSetter.css'

const FontSizeSetter = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { rootFontSize, setRootFontSize } = useConverter()

  const handleRootFontSizeChange = (e: FormEvent<HTMLInputElement>) => {
    setRootFontSize(Number(e.currentTarget.value))
    localStorage.setItem(ROOT_FONT_SIZE, e.currentTarget.value)
  }

  useEffect(() => {
    const storageRootFontSize = getRootFontSizeFromLocalStorage()
    setRootFontSize(Number(storageRootFontSize))
  }, [setRootFontSize])

  return (
    <div className="fs-setter">
      <label htmlFor="rootFontSize">
        Calculation base on a root font-size of{' '}
        <span
          role="textbox"
          tabIndex={-1}
          className="fs-inline-setting"
          onKeyDown={() => inputRef.current?.focus()}
          onClick={() => {
            inputRef.current?.focus()
          }}
        >
          <input
            ref={inputRef}
            id="rootFontSize"
            type="number"
            className="fs-input"
            min="0"
            step="0.001"
            defaultValue={rootFontSize}
            onChange={handleRootFontSizeChange}
          />
          <InvertableImage
            src="pencil.png"
            className="fs-inline-block"
            alt="Copy to clipboard"
          />
        </span>{' '}
        pixel.
      </label>
    </div>
  )
}

export default FontSizeSetter
