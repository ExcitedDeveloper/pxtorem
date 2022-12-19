import { useRef } from 'react'
import InvertableImage from '../InvertableImage/InvertableImage'
import { useConverter } from '../../contexts/Converter/Converter.context'
import './FontSizeSetter.css'

const FontSizeSetter = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { rootFontSize, setRootFontSize } = useConverter()

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
            onChange={(e) => setRootFontSize(Number(e.target.value))}
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
