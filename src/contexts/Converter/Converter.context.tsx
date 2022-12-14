import React from "react"

interface ConverterContextProps {}

export const ConverterContext = React.createContext<ConverterContextProps>(
  {} as ConverterContextProps
)

export interface ConverterProviderProps {
  children?: React.ReactNode
}

export const ConverterProvider: React.FC<ConverterProviderProps> = ({
  children,
}) => {
  return (
    <ConverterContext.Provider value={{}}>{children}</ConverterContext.Provider>
  )
}

export const useConverter = () => React.useContext(ConverterContext)
