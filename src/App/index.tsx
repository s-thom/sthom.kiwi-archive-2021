import { Suspense } from 'react';
import Router from '../components/Router';
import GlobalStyles from './GlobalStyles';
import Providers from './Providers';
import GlobalLoading from '../components/GlobalLoading';

export default function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Suspense fallback={<GlobalLoading />}>
        <Router />
      </Suspense>
    </Providers>
  );
}
