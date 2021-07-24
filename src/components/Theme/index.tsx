import { PropsWithChildren, useMemo } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export default function Theme({ children }: PropsWithChildren<{}>) {
  const theme = useMemo<DefaultTheme>(
    () => ({
      colors: {
        primary: '#002355',
        background: '#0D1117',
        text: '#F0F0F0',
        warning: '#ffdd9e',
        error: '#ff8080',
      },
      mediaQueries: {
        blog: {
          smallMobile: `min-width: 0px`,
          mobile: `min-width: 300px`,
          tablet: `min-width: 768px`,
          desktop: `min-width: 1200px`,
          largeDesktop: `min-width: 3000px`,
        },
      },
    }),
    [],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
