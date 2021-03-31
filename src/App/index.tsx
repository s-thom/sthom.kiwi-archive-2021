import { Suspense } from 'react';
import GlobalLoading from '../components/GlobalLoading';
import Router from '../components/Router';
import Container from './Container';
import GlobalStyles from './GlobalStyles';
import Providers from './Providers';

export default function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Container>
        <Suspense fallback={<GlobalLoading />}>
          <Router />
        </Suspense>
      </Container>
    </Providers>
  );
}
