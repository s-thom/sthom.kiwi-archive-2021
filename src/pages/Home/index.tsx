import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
`;

const Name = styled(animated.h1)`
  font-weight: 400;
`;

export default function Home() {
  const animProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <Container>
      <Name style={animProps}>Stuart Thomson</Name>
    </Container>
  );
}
