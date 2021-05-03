import { PropsWithChildren, useMemo } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export default function Theme({ children }: PropsWithChildren<{}>) {
  const theme = useMemo<DefaultTheme>(
    () => ({
      colors: {
        primary: '#002355',
        // background: '#2d2d4d',
        background: '#0D1117',
        dark: '#0D1117',
        text: '#F0F0F0',
      },
      mediaQueries: {
        teensy: `min-width: 0px`,
        mobile: `min-width: 300px`,
        tablet: `min-width: 768px`,
        desktop: `min-width: 1200px`,
      },
    }),
    [],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
