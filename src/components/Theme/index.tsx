import { PropsWithChildren, useMemo } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export default function Theme({ children }: PropsWithChildren<{}>) {
  const theme = useMemo<DefaultTheme>(
    () => ({
      colors: {
        primary: '#002355',
        background: '#0D1117',
        text: '#FFFFFF',
      },
    }),
    [],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
