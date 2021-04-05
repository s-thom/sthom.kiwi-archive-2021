import { lazy, Suspense } from 'react';
import Router from '../components/Router';
import Container from './Container';
import GlobalStyles from './GlobalStyles';
import Providers from './Providers';

const Backdrop = lazy(() => import('../components/Backdrop'));

export default function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Container>
        <Suspense fallback={<></>}>
          <Backdrop />
        </Suspense>
        <Suspense fallback={<></>}>
          <Router />
        </Suspense>
      </Container>
    </Providers>
  );
}
