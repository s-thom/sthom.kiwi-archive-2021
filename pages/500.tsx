import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../src/components/Layout';
import Link from '../src/components/Link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 2em;
`;

const HomeLink = styled(Link)`
  opacity: 0.9;
`;

export default function ServerErrorPage() {
  return (
    <Layout>
      <NextSeo title="Internal server error | Stuart Thomson" />
      <Container>
        <h2>500 | Internal server error</h2>

        <p>
          <HomeLink href="/">Back to Home</HomeLink>
        </p>
      </Container>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};
