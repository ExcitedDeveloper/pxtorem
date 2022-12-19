import { useRef, useEffect } from 'react'
import { useTheme } from '../../contexts/Theme/Theme.context'
import { ThemeType } from '../../contexts/Theme/Theme.model'
import './InvertableImage.css'

export interface InvertableImageProps {
  src: string
  alt: string
  className?: string
}

const InvertableImage = ({ src, alt, className }: InvertableImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const { themeType } = useTheme()

  // Have one clipboard icon which doesn't display
  // correctly for both light and dark modes.
  // Use classes that do a filter: invert to make
  // icon look correct for the current theme.
  useEffect(() => {
    if (themeType === ThemeType.Light) {
      imgRef.current?.classList.remove('ii-invert-100')
      imgRef.current?.classList.add('ii-invert-0')
    } else {
      imgRef.current?.classList.remove('ii-invert-0')
      imgRef.current?.classList.add('ii-invert-100')
    }
  }, [themeType])

  return (
    <img className={`ii-image ${className}`} src={src} ref={imgRef} alt={alt} />
  )
}

export default InvertableImage
