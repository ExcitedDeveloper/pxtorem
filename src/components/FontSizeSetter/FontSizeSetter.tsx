import { FormEvent, useRef, useCallback } from 'react'
import InvertableImage from '../InvertableImage/InvertableImage'
import { useConverter } from '../../contexts/Converter/Converter.context'
import './FontSizeSetter.css'

const FontSizeSetter = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { rootFontSize, setRootFontSize } = useConverter()

  const handleRootFontSizeChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const fontSize = e.currentTarget.value || '16'

      if (inputRef.current) {
        inputRef.current.value = fontSize
      }

      setRootFontSize(Number(fontSize))
    },
    [setRootFontSize]
  )

  const handleFocus = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="fs-setter">
      <label htmlFor="rootFontSize">
        Calculation base on a root font-size of{' '}
        <span
          role="button"
          tabIndex={0}
          className="fs-inline-setting"
          onKeyDown={handleKeyDown}
          onClick={handleFocus}
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
            alt="Edit font size"
          />
        </span>{' '}
        pixel.
      </label>
    </div>
  )
}

export default FontSizeSetter
