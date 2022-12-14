import { Color } from "../../models/color.model"
import { ThemeType, Theme } from "./Theme.model"

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    "--primary": Color.WHITE,
    "--secondary": Color.BLACK,
    "--background": Color.WHITE,
    "--white": Color.WHITE,
    "--slider-background": Color.DARK_GRAY,
    "--slider-button": Color.DARK_GRAY,
    "--primary-text": Color.BLACK,
    "--secondary-text": Color.BLACK,
    "--light-text": Color.BLACK,
    "--dark-text": Color.BLACK,
  },
  dark: {
    "--primary": Color.VIOLET,
    "--secondary": Color.DARK_GRAY,
    "--background": Color.BLACK,
    "--white": Color.WHITE,
    "--slider-background": Color.WHITE,
    "--slider-button": Color.DARK_GRAY,
    "--primary-text": Color.WHITE,
    "--secondary-text": Color.LIGHT_GRAY,
    "--light-text": Color.BLACK,
    "--dark-text": Color.WHITE,
  },
}
