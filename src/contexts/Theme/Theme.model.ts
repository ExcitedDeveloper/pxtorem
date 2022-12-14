import { Color } from "../../models/color.model"

export enum ThemeType {
  Light = "light",
  Dark = "dark",
}

export interface Theme {
  "--primary": Color
  "--secondary": Color
  "--background": Color
  "--white": Color
  "--slider-background": Color
  "--primary-text": Color
  "--secondary-text": Color
}
