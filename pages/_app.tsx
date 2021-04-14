import { AppProps } from 'next/dist/next-server/lib/router/router';
import { NextWebVitalsMetric } from 'next/dist/next-server/lib/utils';
import App from '../src/App';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // eslint-disable-next-line no-console
  console.debug(metric);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}
