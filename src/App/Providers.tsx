import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Theme from '../components/Theme';

export default function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <BrowserRouter>
      <Theme>{children}</Theme>
    </BrowserRouter>
  );
}
