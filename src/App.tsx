import "./App.css"
import { useTheme } from "./contexts/Theme/Theme.context"
import { ThemeType } from "./contexts/Theme/Theme.model"
import ThemeSlider from "./components/ThemeSlider/ThemeSlider"

function App() {
  const { theme, setCurrentTheme, themeType } = useTheme()
  console.log(theme)

  return (
    <div className='app' style={{ ...(theme as React.CSSProperties) }}>
      <ThemeSlider
        onClick={() =>
          setCurrentTheme(
            themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
          )
        }
      />
      <div className='app-title'>
        <div>PX to REM converter</div>
      </div>
      <div className='app-converter-controls'>convert controls</div>
      <div className='app-font-size-setter'>font-size</div>
      <div className='app-conversion-tables'>conversion tables</div>
    </div>
  )
}

export default App
