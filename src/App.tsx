import "./App.css"
import { useTheme } from "./contexts/Theme/Theme.context"
import { ThemeType } from "./contexts/Theme/Theme.model"
import Slider from "./components/Slider/Slider"

function App() {
  const { theme, setCurrentTheme, themeType } = useTheme()
  console.log(theme)

  return (
    <div className='app' style={{ ...(theme as React.CSSProperties) }}>
      <h1>PX to REM converter</h1>
      <button
        onClick={() =>
          setCurrentTheme(
            themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
          )
        }
      >
        Toggle Theme
      </button>
      <Slider
        onClick={() =>
          setCurrentTheme(
            themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
          )
        }
      />
    </div>
  )
}

export default App
