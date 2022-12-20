import { Color } from '../../models/color.model'

export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

export interface Theme {
  '--primary': Color
  '--secondary': Color
  '--background': Color
  '--white': Color
  '--slider-background': Color
  '--slider-button': Color
  '--primary-text': Color
  '--secondary-text': Color
  '--light-text': Color
  '--dark-text': Color
  '--numeric-border': Color
  '--caret-color': Color
  '--blue': Color
  '--black': Color
  '--silver': Color
  '--github-color': Color
}
