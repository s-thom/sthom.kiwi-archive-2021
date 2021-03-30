import { PropsWithChildren, useMemo } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export default function Theme({ children }: PropsWithChildren<{}>) {
  const theme = useMemo<DefaultTheme>(() => ({}), []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
