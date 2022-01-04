import { AppProps } from 'next/dist/shared/lib/router/router';
import { NextWebVitalsMetric } from 'next/dist/shared/lib/utils';
import App from '../src/App';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // eslint-disable-next-line no-console
  console.debug(metric);
}

export default function MyApp(props: AppProps) {
  return <App {...props} />;
}
