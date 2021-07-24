import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import portraitSrc from '../src/resources/portrait-2020.jpg';

const Backdrop = dynamic(() => import('../src/components/Backdrop'), { ssr: false });

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  pointer-events: none;

  animation: 0.5s ease-in FadeIn;

  font-size: 0.8em;
  @media (${({ theme }) => theme.mediaQueries.mobile}) {
    font-size: 1em;
  }
  @media (${({ theme }) => theme.mediaQueries.tablet}) {
    font-size: 1.2em;
  }
  @media (${({ theme }) => theme.mediaQueries.desktop}) {
    font-size: 1.3em;
  }

  & > * {
    pointer-events: all;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled(Image)`
  border-radius: 100px;
`;

const Name = styled.h1`
  font-size: 2.5em;
  margin-bottom: 0;
`;

const JobLine = styled.p`
  font-size: 0.9em;
  margin-top: 0;
`;

const Icon = styled.svg`
  width: 1.5em;
  height: 1.5em;
  margin: 0.5em;
  fill: ${({ theme }) => theme.colors.text};
`;

export default function Home() {
  return (
    <>
      <Backdrop />
      <VerticalContainer>
        <ProfilePhoto src={portraitSrc} alt="Stuart Thomson" width={200} height={200} priority />
        <Name>Stuart Thomson</Name>
        <JobLine>Software Developer | Human Being</JobLine>
        <HorizontalContainer>
          {
            // <Link href="/blog">
            // {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            // <a aria-label="Blog">
            //   <Icon viewBox="0 0 24 24">
            //     <title>Blog</title>
            //     <path d="M15.54 3.5l4.96 4.97-1.43 1.41-4.95-4.95 1.42-1.43M3.5 19.78l6.5-6.47c-.1-.31-.03-.7.23-.96.39-.39 1.03-.39 1.42 0 .39.4.39 1.03 0 1.42-.26.26-.65.33-.96.23l-6.47 6.5 10.61-3.55 3.53-6.36-4.94-4.95-6.37 3.53L3.5 19.78z" />
            //   </Icon>
            // </a>
            // </Link>
          }
          <a href="https://github.com/s-thom" aria-label="GitHub" rel="nofollow noopener noreferrer" target="_blank">
            <Icon viewBox="0 0 24 24">
              <title>GitHub</title>
              <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c2-1.2 2.8-1 2.8-1 .5 1.4.1 2.4 0 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 5 .4.2.7.8.7 1.8V21c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0 0 12 2z" />
            </Icon>
          </a>
          <a href="mailto:me@sthom.kiwi" aria-label="Email" rel="nofollow noopener noreferrer" target="_blank">
            <Icon viewBox="0 0 24 24">
              <title>Email</title>
              <path d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z" />
            </Icon>
          </a>
          <a
            href="https://www.linkedin.com/in/s-thom/"
            aria-label="LinkedIn"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            <Icon viewBox="0 0 24 24">
              <title>LinkedIn</title>
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.3 3.3 0 0 0-3.3-3.3c-.8 0-1.8.6-2.3 1.3v-1h-2.8v8.3H13v-5c0-.7.6-1.3 1.4-1.3a1.4 1.4 0 0 1 1.4 1.4v4.9h2.8M6.9 8.5A1.7 1.7 0 0 0 8.6 7c0-1-.8-1.7-1.7-1.7a1.7 1.7 0 0 0-1.7 1.7c0 1 .8 1.7 1.7 1.7m1.4 9.9v-8.4H5.5v8.4h2.8z" />
            </Icon>
          </a>
        </HorizontalContainer>
      </VerticalContainer>
    </>
  );
}
