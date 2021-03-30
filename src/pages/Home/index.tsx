import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Name = styled.h1`
  font-weight: 400;
`;

export default function Home() {
  return (
    <Container>
      <Name>Stuart Thomson</Name>
    </Container>
  );
}
