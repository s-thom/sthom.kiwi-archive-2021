import '@fontsource/inter';
import '@fontsource/jetbrains-mono';
import '@fontsource/jost';
import { PropsWithChildren, useMemo } from 'react';
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';
import useDarkTheme from '../../hooks/useDarkTheme';

const LIGHT_MODE_COLOURS: DefaultTheme['colors'] = {
  primary: '#4273bd',
  background: '#e4e4e4',
  text: '#0D1117',
  warning: '#ce8c11',
  error: '#972929',
};
const DARK_MODE_COLOURS: DefaultTheme['colors'] = {
  primary: '#002355',
  background: '#0D1117',
  text: '#F0F0F0',
  warning: '#ffdd9e',
  error: '#ff8080',
};

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  font-family: 'InterVariable', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.2em;
  /* Fontsource doesn't package stylistic sets. If I ever decide to fully self-host the font files, then these
   * can be enabled again.
   */
  /* font-feature-settings: "tnum", "ss02", "cv03", "cv04"; */
}

code {
  font-family: 'JetBrains Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

h1,h2,h3,h4,h5,h6 {
  font-family: Jost, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 400;
}

@keyframes FadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
`;

export default function Theme({ children }: PropsWithChildren<{}>) {
  const { value: isDarkTheme } = useDarkTheme(false);

  const theme = useMemo<DefaultTheme>(
    () => ({
      colors: isDarkTheme ? DARK_MODE_COLOURS : LIGHT_MODE_COLOURS,
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
    [isDarkTheme],
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
