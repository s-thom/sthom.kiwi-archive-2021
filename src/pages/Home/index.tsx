import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const VerticalContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Name = styled.h1`
  font-weight: 400;
`;

const Icon = styled.svg`
  width: 2em;
  height: 2em;
  margin: 0.5em;
  fill: ${({ theme }) => theme.colors.text};
`;

export default function Home() {
  const animProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <VerticalContainer style={animProps}>
      <Name>Stuart Thomson</Name>
      <HorizontalContainer>
        <a href="mailto:me@sthom.kiwi" aria-label="Email">
          <Icon viewBox="0 0 24 24">
            <title>Email</title>
            <path d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z" />
          </Icon>
        </a>
        <a href="https://github.com/s-thom" aria-label="GitHub">
          <Icon viewBox="0 0 24 24">
            <title>GitHub</title>
            <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c2-1.2 2.8-1 2.8-1 .5 1.4.1 2.4 0 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 5 .4.2.7.8.7 1.8V21c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0 0 12 2z" />
          </Icon>
        </a>
        <a href="https://www.linkedin.com/in/s-thom/" aria-label="LinkedIn">
          <Icon viewBox="0 0 24 24">
            <title>LinkedIn</title>
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.3 3.3 0 0 0-3.3-3.3c-.8 0-1.8.6-2.3 1.3v-1h-2.8v8.3H13v-5c0-.7.6-1.3 1.4-1.3a1.4 1.4 0 0 1 1.4 1.4v4.9h2.8M6.9 8.5A1.7 1.7 0 0 0 8.6 7c0-1-.8-1.7-1.7-1.7a1.7 1.7 0 0 0-1.7 1.7c0 1 .8 1.7 1.7 1.7m1.4 9.9v-8.4H5.5v8.4h2.8z" />
          </Icon>
        </a>
      </HorizontalContainer>
    </VerticalContainer>
  );
}
