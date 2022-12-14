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
      <h1>PX to REM converter</h1>
    </div>
  )
}

export default App
