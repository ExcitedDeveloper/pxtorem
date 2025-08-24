import React, { useState, Dispatch, SetStateAction, useMemo } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { ROOT_FONT_SIZE } from '../../util'

export enum ConversionDirection {
  PxToRem,
  RemToPx,
}

interface ConverterContextProps {
  readonly direction: ConversionDirection
  readonly setDirection: Dispatch<SetStateAction<ConversionDirection>>
  readonly pixels: number | undefined
  readonly setPixels: Dispatch<SetStateAction<number | undefined>>
  readonly rootFontSize: number
  readonly setRootFontSize: (value: number | ((val: number) => number)) => void
}

const DFLT_PIXELS = 16
const DFLT_ROOT_FONT_SIZE = 16

export const ConverterContext = React.createContext<ConverterContextProps>({
  direction: ConversionDirection.PxToRem,
  pixels: DFLT_PIXELS,
  rootFontSize: DFLT_ROOT_FONT_SIZE,
} as ConverterContextProps)

export interface ConverterProviderProps {
  readonly children?: React.ReactNode
}

export const ConverterProvider: React.FC<ConverterProviderProps> = ({
  children,
}) => {
  const [direction, setDirection] = useState<ConversionDirection>(
    ConversionDirection.PxToRem
  )
  const [pixels, setPixels] = useState<number | undefined>(DFLT_PIXELS)
  const [rootFontSize, setRootFontSize] = useLocalStorage<number>(
    ROOT_FONT_SIZE,
    DFLT_ROOT_FONT_SIZE
  )

  const value = useMemo(
    () => ({
      direction,
      setDirection,
      pixels,
      setPixels,
      rootFontSize,
      setRootFontSize,
    }),
    [direction, pixels, rootFontSize, setRootFontSize]
  )

  return (
    <ConverterContext.Provider value={value}>
      {children}
    </ConverterContext.Provider>
  )
}

export const useConverter = () => React.useContext(ConverterContext)
