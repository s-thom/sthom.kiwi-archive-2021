import styled from 'styled-components';

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export default Container;
