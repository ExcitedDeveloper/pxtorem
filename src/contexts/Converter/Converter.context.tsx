import React, { useState, Dispatch, SetStateAction, useMemo } from 'react'

export enum ConversionDirection {
  PxToRem,
  RemToPx,
}

interface ConverterContextProps {
  direction: ConversionDirection
  setDirection: Dispatch<SetStateAction<ConversionDirection>>
  pixels: number | undefined
  setPixels: Dispatch<SetStateAction<number | undefined>>
  rootFontSize: number
  setRootFontSize: Dispatch<SetStateAction<number>>
}

const DFLT_PIXELS = 16
const DFLT_ROOT_FONT_SIZE = 16

let initRootFontSize = DFLT_ROOT_FONT_SIZE

const storageRootFontSize = localStorage.getItem('root-font-size')

if (storageRootFontSize) {
  initRootFontSize = Number(storageRootFontSize)
}

export const ConverterContext = React.createContext<ConverterContextProps>({
  direction: ConversionDirection.PxToRem,
  pixels: DFLT_PIXELS,
  rootFontSize: initRootFontSize,
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
  const [pixels, setPixels] = useState<number | undefined>(DFLT_PIXELS)
  const [rootFontSize, setRootFontSize] = useState<number>(initRootFontSize)

  const value = useMemo(
    () => ({
      direction,
      setDirection,
      pixels,
      setPixels,
      rootFontSize,
      setRootFontSize,
    }),
    [direction, pixels, rootFontSize]
  )

  return (
    <ConverterContext.Provider value={value}>
      {children}
    </ConverterContext.Provider>
  )
}

export const useConverter = () => React.useContext(ConverterContext)
