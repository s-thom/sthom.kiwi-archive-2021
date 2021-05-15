import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      dark: string;
      text: string;
      warning: string;
      error: string;
    };
    mediaQueries: {
      teensy: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
