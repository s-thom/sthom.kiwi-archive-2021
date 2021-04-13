import { AppProps } from 'next/dist/next-server/lib/router/router';
import { NextWebVitalsMetric } from 'next/dist/next-server/lib/utils';
import Container from '../src/app/Container';
import GlobalStyles from '../src/app/GlobalStyles';
import Theme from '../src/components/Theme';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // eslint-disable-next-line no-console
  console.debug(metric);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Theme>
        <GlobalStyles />
        <Container>
          <Component {...pageProps} />
        </Container>
      </Theme>
    </>
  );
}
