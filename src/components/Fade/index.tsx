import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const TRANSITION_NAME = 'fade';

const FadeWrapper = styled.div`
  transition: opacity 200ms ease-out;

  &.${TRANSITION_NAME}-enter {
    opacity: 0;
  }
  &.${TRANSITION_NAME}-enter-active {
    opacity: 1;
  }

  &.${TRANSITION_NAME}-exit {
    opacity: 1;
  }
  &.${TRANSITION_NAME}-exit-active {
    opacity: 0;
  }
`;

export interface FadeProps {
  in?: boolean;
}

export default function Fade({ in: inProp, children }: React.PropsWithChildren<FadeProps>) {
  return (
    <CSSTransition in={inProp} timeout={200} classNames={TRANSITION_NAME} mountOnEnter unmountOnExit appear>
      <FadeWrapper>{children}</FadeWrapper>
    </CSSTransition>
  );
}
