import { AppProps } from 'next/dist/next-server/lib/router/router';
import Container from '../src/App/Container';
import GlobalStyles from '../src/App/GlobalStyles';
import Theme from '../src/components/Theme';

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
