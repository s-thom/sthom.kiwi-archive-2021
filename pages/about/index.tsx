import { NextSeo } from 'next-seo';
import React from 'react';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';

const Container = styled.div`
  display: grid;
  gap: 2em;
  grid-template-areas: 'human' 'dev';

  @media (${({ theme }) => theme.mediaQueries.blog.desktop}) {
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
          <p>
            Hi, I&apos;m Stuart. In my spare time, I like walking around New Zealand&apos;s native bush. It&apos;s an
            environment that has always drawn me in, and it&apos;s a place that I want to protect. Closer to home, I
            also enjoy playing video games with my friends; both in New Zealand and all over the world. It can be hard
            getting people together, especially with different timezones, but it&apos;s always great to be chatting with
            each other and catching up on what has been happening in our lives.
          </p>
          <p>
            I like music and art. Though it has been a while, I&apos;ve played the clarinet in local symphonic bands. I
            look forward to the opportunity to pick it up again. I also like going to art galleries, and supporting the
            artists behind the art where I can.
          </p>
          <p>
            Finally, I also enjoy building software, which overlaps a lot with the other column. I&apos;ve made a few
            side-projects to help with problems I&apos;ve come across. I&apos;m also investigating self-hosting a few
            services, but this is an ongoing project.
          </p>
        </HumanContainer>
        <DevContainer>
          <h2>Software Developer</h2>
          <p>
            Hi, I&apos;m Stuart. I&apos;m good at building web-based applications, which is what my roles at work have
            been focused on. I work primarily in Typescript (with React for the frontend framework) and SQL (Postgres,
            but I have also used MySQL and SQLite). In the past, I have also used Java and C#.
          </p>
          <p>
            I also have experience with running Linux servers (both in a desktop environment and over SSH), as well as
            using Docker (or other containerisation systems) for development and deployment. I have also setup full CI
            pipelines using GitHub Actions, GitLab CI, and Jenkins.
          </p>
          <p>
            I enjoy design, but I usually leave that job for people with more experience and knowledge than I do. Given
            some guidelines, I can sketch screens and flows out on a whiteboard to clearly communicate my design ideas.
            I also care about accessibility, always aiming to ensure assistive tools can understand the application.
          </p>
        </DevContainer>
      </Container>
    </Layout>
  );
}
