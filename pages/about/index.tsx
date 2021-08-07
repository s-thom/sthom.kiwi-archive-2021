import { NextSeo } from 'next-seo';
import React from 'react';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';

const Container = styled.div`
  display: grid;
  gap: 2em;
  grid-template-areas: 'human' 'dev';

  @media (${({ theme }) => theme.mediaQueries.blog.desktop}) {
    padding-top: 3em;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'dev human';
  }
`;

const DevContainer = styled.div`
  grid-area: dev;
`;

const HumanContainer = styled.div`
  grid-area: human;
`;

export default function AboutPage() {
  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About Me' },
      ]}
    >
      <NextSeo title="About Me | Stuart Thomson" />
      <Container>
        <HumanContainer>
          <h2>Human Being</h2>
        </HumanContainer>
        <DevContainer>
          <h2>Software Developer</h2>
        </DevContainer>
      </Container>
    </Layout>
  );
}
