export interface ThemeConfig {
  themeId: string;
  mainColors: {
    [key in ThemeMainColorType]: string;
  };
}

export interface ColorConfig {
  colorVariant: string;
  colorHexValue: string;
  shouldHaveDarkContrast: boolean;
}

export enum ThemeMainColorType {
  primaryColor = 'primaryColor',
  accentColor = 'accentColor',
  warnColor = 'warnColor',
  headerColor = 'headerColor'
}

export interface ThemeableComponentConfig {
  label: string;
  colors: ThemeableComponentProperties;
}

export interface ThemeableComponentProperties {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}


