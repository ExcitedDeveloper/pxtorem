import { useEffect, useState } from "react"
import "./ConverterTitle.css"
import {
  ConversionDirection,
  useConverter,
} from "../../contexts/Converter/Converter.context"

const PxToRemText = "PX to REM converter"
const RemToPxText = "REM to PX converter"

const ConverterTitle = () => {
  const { direction } = useConverter()
  const [title, setTitle] = useState(PxToRemText)

  useEffect(() => {
    if (direction === ConversionDirection.PxToRem) {
      setTitle(PxToRemText)
    } else {
      setTitle(RemToPxText)
    }
  }, [direction])

  return (
    <div className='converter-title'>
      <div>
        <div>{title}</div>
      </div>
    </div>
  )
}

export default ConverterTitle
