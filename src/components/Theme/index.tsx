import { PropsWithChildren, useMemo } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const LIGHT_MODE_COLOURS: DefaultTheme['colors'] = {
  primary: '#4273bd',
  background: '#e4e4e4',
  text: '#0D1117',
  warning: '#ce8c11',
  error: '#972929',
};
// const DARK_MODE_COLOURS: DefaultTheme['colors'] = {
//   primary: '#002355',
//   background: '#0D1117',
//   text: '#F0F0F0',
//   warning: '#ffdd9e',
//   error: '#ff8080',
// };

export default function Theme({ children }: PropsWithChildren<{}>) {
  const theme = useMemo<DefaultTheme>(
    () => ({
      colors: LIGHT_MODE_COLOURS,
      mediaQueries: {
        blog: {
          smallMobile: `min-width: 0px`,
          mobile: `min-width: 300px`,
          tablet: `min-width: 768px`,
          desktop: `min-width: 1024px`,
          largeDesktop: `min-width: 1440px`,
          extraLargeDesktop: `min-width: 3000px`,
        },
      },
    }),
    [],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
