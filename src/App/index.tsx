import Router from '../components/Router';
import './App.css';
import GlobalStyles from './GlobalStyles';
import Providers from './Providers';

export default function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Router />
    </Providers>
  );
}
