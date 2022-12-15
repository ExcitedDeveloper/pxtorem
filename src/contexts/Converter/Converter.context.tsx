import React, { useState, Dispatch, SetStateAction } from "react"

export enum ConversionDirection {
  PxToRem,
  RemToPx,
}

interface ConverterContextProps {
  direction: ConversionDirection
  setDirection: Dispatch<SetStateAction<ConversionDirection>>
  pixels: number
  setPixels: Dispatch<SetStateAction<number>>
  rootFontSize: number
  setRootFontSize: Dispatch<SetStateAction<number>>
}

const DFLT_PIXELS = 16
const DFLT_ROOT_FONT_SIZE = 16

export const ConverterContext = React.createContext<ConverterContextProps>({
  direction: ConversionDirection.PxToRem,
  pixels: DFLT_PIXELS,
  rootFontSize: DFLT_ROOT_FONT_SIZE,
} as ConverterContextProps)

export interface ConverterProviderProps {
  children?: React.ReactNode
}

export const ConverterProvider: React.FC<ConverterProviderProps> = ({
  children,
}) => {
  const [direction, setDirection] = useState<ConversionDirection>(
    ConversionDirection.PxToRem
  )
  const [pixels, setPixels] = useState<number>(DFLT_PIXELS)
  const [rootFontSize, setRootFontSize] = useState<number>(DFLT_ROOT_FONT_SIZE)

  return (
    <ConverterContext.Provider
      value={{
        direction,
        setDirection,
        pixels,
        setPixels,
        rootFontSize,
        setRootFontSize,
      }}
    >
      {children}
    </ConverterContext.Provider>
  )
}

export const useConverter = () => React.useContext(ConverterContext)
