import './App.css'
import { useTheme } from './contexts/Theme/Theme.context'
import { ThemeType } from './contexts/Theme/Theme.model'
import ThemeSlider from './components/ThemeSlider/ThemeSlider'
import ConverterTitle from './components/ConverterTitle/ConverterTitle'
import ConverterControls from './components/ConverterControls/ConverterControls'
import FontSizeSetter from './components/FontSizeSetter/FontSizeSetter'
import ConversionTables from './components/ConversionTables/ConversionTables'

function App() {
  const { theme, setCurrentTheme, themeType } = useTheme()

  const handleThemeClick = () => {
    setCurrentTheme(
      themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
    )
  }

  return (
    <main className="app" style={{ ...(theme as React.CSSProperties) }}>
      <ThemeSlider onClick={handleThemeClick} />
      <ConverterTitle />
      <ConverterControls />
      <FontSizeSetter />
      <ConversionTables />
    </main>
  )
}

export default App
