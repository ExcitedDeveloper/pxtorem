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
      <div
        style={{
          flex: "2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div>PX to REM converter</div>
      </div>
      <div style={{ height: "50px" }}>convert controls</div>
      <div style={{ height: "50px" }}>font-size</div>
      <div style={{ flex: "2" }}>conversion tables</div>
    </div>
  )
}

export default App
