import { useRef, useEffect } from 'react'
import { useTheme } from '../../contexts/Theme/Theme.context'
import { ThemeType } from '../../contexts/Theme/Theme.model'
import '../../App.css'
import './FontSizeSetter.css'

const FontSizeSetter = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const { themeType } = useTheme()

  // Have one clipboard icon which doesn't display
  // correctly for both light and dark modes.
  // Use classes that do a filter: invert to make
  // icon look correct for the current theme.
  useEffect(() => {
    if (themeType === ThemeType.Light) {
      imgRef.current?.classList.remove('invert-100')
      imgRef.current?.classList.add('invert-0')
    } else {
      imgRef.current?.classList.remove('invert-0')
      imgRef.current?.classList.add('invert-100')
    }
  }, [themeType])

  return (
    <div className="fs-setter">
      <label htmlFor="rootFontSize">
        Calculation base on a root font-size of{' '}
        <span
          role="textbox"
          tabIndex={-1}
          className="fs-inline-setting"
          onKeyDown={() => inputRef.current?.focus()}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            id="rootFontSize"
            type="number"
            className="fs-input"
            min="0"
            step="0.001"
            defaultValue={16}
          />
          <img
            className="fs-pencil"
            src="pencil.png"
            ref={imgRef}
            alt="Copy to clipboard"
          />
        </span>{' '}
        pixel.
      </label>
    </div>
  )
}

export default FontSizeSetter
