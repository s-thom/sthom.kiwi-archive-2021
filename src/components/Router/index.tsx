import { lazy } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

const Home = lazy(() => import('../../pages/Home'));

const Wrapper = styled(animated.div)`
  position: relative;
  z-index: 1;
`;

export default function Router() {
  const location = useLocation();
  const transition = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition((style, item) => (
    <Wrapper style={style}>
      <Switch location={item}>
        <Route path="/" render={() => <Home />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Wrapper>
  ));
}
