import { Injectable } from '@angular/core';
import { ColorConfig, ThemeConfig, ThemeMainColorType } from './theme-config';
import * as tinycolor from 'tinycolor2';
import { GetSiteDesignService } from 'src/app/logic/admin/get-site-design.service';
import { Observable, delay, ReplaySubject } from 'rxjs';
import { SiteConfiguration } from '../api/API';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  private static readonly THEME_VARIABLE_PREFIX = '--theme';
  private error$!: Observable<string | undefined>;
  public loading$!: Observable<boolean>;
  private success$!: Observable<SiteConfiguration | null | undefined>;
  private logo: ReplaySubject<string> = new ReplaySubject();
  public _logo$: Observable<string> = this.logo.asObservable();
  constructor(private _getSiteDesignLogic: GetSiteDesignService) {
    this.error$ = this._getSiteDesignLogic.error$;
    this.loading$ = this._getSiteDesignLogic.loading$;
    this.success$ = this._getSiteDesignLogic.success$;
  }
  /**
   * The load method must return a Promise, since that will make the application wait in the APP_INITIALIZER DI token
   * After all the loading and set up is finished, we can proceed with rendering the application
   */
  initializeTheme() {
    this.success$.pipe(delay(3000)).subscribe((data) => {
      let theme: ThemeConfig = {
        themeId: 'site-teme',
        mainColors: {
          primaryColor: data?.buttonColor || 'blue',
          accentColor: data?.highlightColor || '#FFFFFF',
          warnColor: '#ff0700',
          headerColor: data?.headerColor || '#FFFFFF',
        },
      };
      this.logo.next(data?.logoImage || '');
      this.setupMainPalettes(theme);
    });

    this._getSiteDesignLogic.getSiteTemeData();
  }

  /**
   * This method will generate the theme palette required by Angular Material
   * It will correctly set up the variable names used in /assets/styles/_variables.scss
   * @param themeConfig
   * @private
   */
  private setupMainPalettes(themeConfig: ThemeConfig): void {
    Object.keys(themeConfig.mainColors).forEach((key: string) => {
      const selectedColorValue: string =
        themeConfig.mainColors[key as ThemeMainColorType];

      // Should be for example: --theme-primary or --theme-accent etc..
      const variableName: string = this.prependVariableName(
        this.convertCamelCaseToKebabCase(key)
      );

      // Generate the palette colors
      const colorPalette: Array<ColorConfig> =
        this.generateColorPalette(selectedColorValue);

      colorPalette.forEach((colorConfig: ColorConfig) => {
        // Destructure the color config
        const { colorVariant, colorHexValue, shouldHaveDarkContrast } =
          colorConfig;

        // Set the color variable
        const colorVariableName = `${variableName}-${colorVariant}`;
        this.setColorVariable(colorVariableName, colorHexValue);

        // By Angular material, contrasted colors are either white, or a darker color
        // Set the contrast color
        const contrastedColorVariableName = `${variableName}-contrast-${colorVariant}`;
        const contrastedColorValue = shouldHaveDarkContrast
          ? 'rgba(0, 0, 0, 0.87)'
          : '#fff';
        this.setColorVariable(
          contrastedColorVariableName,
          contrastedColorValue
        );
      });
    });
  }

  /**
   * This method generates a color palette comprised of 14 main and 14 contrast colors per the Angular material specification
   * It will allow us to have different shades of some color and we can use all of those shades in our material and non-material
   * components via css.
   * The configuration can never be 100% accurate to the Material stock colors, as they are sometimes hand-made by a designer
   * So this calculation will never be 100% accurate to the original colors provided in the Material design CSS files
   * @param hexColor
   * @private
   */
  private generateColorPalette(hexColor: string): Array<ColorConfig> {
    const baseLight = tinycolor('#ffffff');
    const baseDark = this.multiply(
      tinycolor(hexColor).toRgb(),
      tinycolor(hexColor).toRgb()
    );
    const baseTriad = tinycolor(hexColor).tetrad();

    return [
      this.mapColorConfig(tinycolor.mix(baseLight, hexColor, 12), '50'),
      this.mapColorConfig(tinycolor.mix(baseLight, hexColor, 30), '100'),
      this.mapColorConfig(tinycolor.mix(baseLight, hexColor, 50), '200'),
      this.mapColorConfig(tinycolor.mix(baseLight, hexColor, 70), '300'),
      this.mapColorConfig(tinycolor.mix(baseLight, hexColor, 85), '400'),
      this.mapColorConfig(tinycolor.mix(baseLight, hexColor, 100), '500'),
      this.mapColorConfig(tinycolor.mix(baseDark, hexColor, 87), '600'),
      this.mapColorConfig(tinycolor.mix(baseDark, hexColor, 70), '700'),
      this.mapColorConfig(tinycolor.mix(baseDark, hexColor, 54), '800'),
      this.mapColorConfig(tinycolor.mix(baseDark, hexColor, 25), '900'),
      this.mapColorConfig(
        tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(65),
        'A100'
      ),
      this.mapColorConfig(
        tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(55),
        'A200'
      ),
      this.mapColorConfig(
        tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(45),
        'A400'
      ),
      this.mapColorConfig(
        tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(40),
        'A700'
      ),
    ];
  }

  /**
   * Map the color and its variant to something that we understand
   * Also check if we need to use a light or dark contrast color
   * @param tinyColorInstance
   * @param colorVariant
   * @private
   */
  private mapColorConfig(
    tinyColorInstance: tinycolor.Instance,
    colorVariant: string
  ): ColorConfig {
    return {
      colorVariant,
      colorHexValue: tinyColorInstance.toHexString(),
      shouldHaveDarkContrast: tinyColorInstance.isLight(),
    };
  }

  private multiply(
    rgb1: tinycolor.ColorFormats.RGB,
    rgb2: tinycolor.ColorFormats.RGB
  ): tinycolor.Instance {
    rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
    rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
    rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
    const { r, g, b } = rgb1;

    return tinycolor(`rgb ${r} ${g} ${b}`);
  }

  private prependVariableName(key: string): string {
    return `${ThemingService.THEME_VARIABLE_PREFIX}-${key}`;
  }

  /**
   * Change a camelCase variable to a kebab case
   * e.g: primaryColor -> primary-color
   * @param key
   * @private
   */
  private convertCamelCaseToKebabCase(key: string): string {
    return key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  private setColorVariable(variable: string, color: string): void {
    document.documentElement.style.setProperty(variable, color);
  }
}
