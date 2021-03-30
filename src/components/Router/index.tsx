import { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('../../pages/Home'));

export default function Router() {
  return (
    <Switch>
      <Route path="/" render={() => <Home />} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}
