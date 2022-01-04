import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Header, { HeaderProps } from './Header';

const Container = styled.div`
  margin: 0 auto;

  width: 90vw;
  width: clamp(16rem, 93vw, 75rem);

  animation: 0.5s ease-in FadeIn;
`;

const ContentArea = styled.div`
  font-size: 1.1em;

  margin-top: 1.2em;
`;

export interface LayoutProps {
  breadcrumbs?: HeaderProps['breadcrumbs'];
}

export default function Layout({ breadcrumbs, children }: PropsWithChildren<LayoutProps>) {
  return (
    <Container>
      <Header breadcrumbs={breadcrumbs} />
      <ContentArea>{children}</ContentArea>
    </Container>
  );
}
