import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import Header, { HeaderProps } from './Header';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1em;
  max-width: 70em;
  min-height: 100vh;
  height: 100%;

  animation: 0.5s ease-in FadeIn;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'aside';
  grid-template-columns: 100%;
  gap: 0.5em;

  @media (${({ theme }) => theme.mediaQueries.tablet}) {
    grid-template-areas:
      'header content'
      'aside content';
    grid-template-columns: 10em 1fr;
    gap: 1em;
  }

  @media (${({ theme }) => theme.mediaQueries.desktop}) {
    grid-template-columns: 20em 1fr;
  }
`;

const ContentArea = styled.div`
  grid-area: content;
  font-size: 1.1em;
`;

const HeaderArea = styled(Header)`
  grid-area: header;
`;

const AsideArea = styled.aside`
  grid-area: aside;
`;

export interface LayoutProps {
  breadcrumbs?: HeaderProps['breadcrumbs'];
  aside?: ReactNode;
}

export default function Layout({ breadcrumbs, aside, children }: PropsWithChildren<LayoutProps>) {
  return (
    <Container>
      <GridContainer>
        <HeaderArea breadcrumbs={breadcrumbs} />
        <ContentArea>{children}</ContentArea>
        {aside && <AsideArea>{aside}</AsideArea>}
      </GridContainer>
    </Container>
  );
}
