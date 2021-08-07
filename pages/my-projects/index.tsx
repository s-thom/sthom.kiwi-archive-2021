import { NextSeo } from 'next-seo';
import Image, { ImageProps } from 'next/image';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import howToScreenshotImage from './hts.png';

const ProjectWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  overflow: hidden;
`;

const ProjectImageWrapper = styled.div`
  position: relative;
`;

const ProjectImage = styled(Image)``;

const ProjectContent = styled.div`
  margin: 1em;
`;

const ProjectTitle = styled.h3`
  font-size: 1em;
  font-weight: 500;
`;
const ProjectDescription = styled.div`
  font-size: 0.8em;
`;

const Icon = styled.svg`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  margin-bottom: 0.25em;
  vertical-align: middle;
  fill: ${({ theme }) => theme.colors.text};
`;

function GithubLink({ link }: { link: string }) {
  return (
    <a href={link} aria-label="GitHub" rel="nofollow noopener noreferrer" target="_blank">
      <Icon viewBox="0 0 24 24">
        <title>GitHub</title>
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c2-1.2 2.8-1 2.8-1 .5 1.4.1 2.4 0 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 5 .4.2.7.8.7 1.8V21c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0 0 12 2z" />
      </Icon>
    </a>
  );
}

interface Project {
  name: string;
  image?: ImageProps['src'];
  description?: React.ReactNode;
  link?: string;
  github?: string;
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
}

function ProjectCard({ project, ...rest }: ProjectCardProps) {
  const { name, image, description, link, github } = project;

  const nameElement = link ? <Link href={link}>{name}</Link> : name;

  return (
    <ProjectWrapper {...rest}>
      {image &&
        (link ? (
          <Link href={link}>
            <ProjectImageWrapper>
              <ProjectImage src={image} alt={name} layout="responsive" />
            </ProjectImageWrapper>
          </Link>
        ) : (
          <ProjectImageWrapper>
            <ProjectImage src={image} alt={name} layout="responsive" />
          </ProjectImageWrapper>
        ))}
      <ProjectContent>
        <ProjectTitle>
          {github && <GithubLink link="github" />}
          {nameElement}
        </ProjectTitle>
        {description && <ProjectDescription>{description}</ProjectDescription>}
      </ProjectContent>
    </ProjectWrapper>
  );
}

export default function ProjectsPage() {
  const activeProjects = useMemo<Project[]>(
    () => [
      {
        name: 'How to Screenshot',
        description: (
          <>
            <p>A website to show how to take screenshots on various platforms.</p>
            <p>
              This project was partially to solve a pet peeve of mine (when people use their phone to take a photo of a
              screen), but also to try and make a modern website without any framework at all. All images are embedded
              SVG, meaning the browser doesn&apos;t need to fetch additional resources to load.
            </p>
          </>
        ),
        github: 'https://github.com/s-thom/howtoscreenshot',
        image: howToScreenshotImage,
        link: 'https://screenshot.help/',
      },
    ],
    [],
  );

  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/my-projects', name: 'Projects' },
      ]}
    >
      <NextSeo title="Projects | Stuart Thomson" />
      <h1>Active Projects</h1>
      <p>
        These projects are still actively being worked on. If they look like your kind of thing, then contributions are
        welcome!
      </p>
      <div role="list">
        {activeProjects.map((project) => (
          <ProjectCard key={project.name} project={project} role="listitem" />
        ))}
      </div>
      <h1>Completed Projects</h1>
      <p>
        These are the lucky ones that have graduated to the promised land known as &quot;the done column of my projects
        board&quot;.
      </p>
      <h1>Dormant Projects</h1>
      <p>These projects are currently lying in wait for either time or motivation.</p>
    </Layout>
  );
}
