import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
    };
    mediaQueries: {
      teensy: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
