import { Color } from "../../models/color.model"
import { ThemeType, Theme } from "./Theme.model"

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    "--primary": Color.WHITE,
    "--secondary": Color.BLACK,
    "--background": Color.WHITE,
    "--white": Color.WHITE,
    "--slider-background": Color.LIGHT_GRAY,
    "--primary-text": Color.BLACK,
    "--secondary-text": Color.BLACK,
  },
  dark: {
    "--primary": Color.VIOLET,
    "--secondary": Color.DARK_GRAY,
    "--background": Color.BLACK,
    "--white": Color.WHITE,
    "--slider-background": Color.BLACK,
    "--primary-text": Color.WHITE,
    "--secondary-text": Color.DARK_GRAY,
  },
}
