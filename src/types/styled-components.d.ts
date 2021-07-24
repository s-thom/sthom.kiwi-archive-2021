import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
      warning: string;
      error: string;
    };
    mediaQueries: {
      blog: {
        smallMobile: string;
        mobile: string;
        tablet: string;
        desktop: string;
        largeDesktop: string;
        extraLargeDesktop: string;
      };
    };
  }
}
