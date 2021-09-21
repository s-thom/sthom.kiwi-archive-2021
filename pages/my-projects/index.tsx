import { NextSeo } from 'next-seo';
import Image, { ImageProps } from 'next/image';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import colourImage from './colour.png';
import ednonImage from './ednon.png';
import howToScreenshotImage from './hts.png';
import sthomKiwiImage from './sthom.png';
import theIndexImage from './the-index.png';

const ProjectList = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr;

  @media (${({ theme }) => theme.mediaQueries.blog.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProjectWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  overflow: hidden;
`;

const ProjectImageWrapper = styled.div`
  position: relative;
`;

const ProjectImage = styled(Image)`
  width: 100%;
  aspect-ratio: 2 / 1;
`;

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
  title: string;
  image?: ImageProps['src'];
  description?: React.ReactNode;
  link?: string;
  github?: string;
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
}

function ProjectCard({ project, ...rest }: ProjectCardProps) {
  const { title, image, description, link, github } = project;

  const titleElement = link ? <Link href={link}>{title}</Link> : title;

  return (
    <ProjectWrapper {...rest}>
      {image &&
        (link ? (
          <Link href={link}>
            <ProjectImageWrapper>
              <ProjectImage src={image} alt={title} layout="responsive" />
            </ProjectImageWrapper>
          </Link>
        ) : (
          <ProjectImageWrapper>
            <ProjectImage src={image} alt={title} layout="responsive" />
          </ProjectImageWrapper>
        ))}
      <ProjectContent>
        <ProjectTitle>
          {github && <GithubLink link="github" />}
          {titleElement}
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
        title: 'How to Screenshot',
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
      {
        title: 'sthom.kiwi',
        description: (
          <p>
            I am working on the very website you&apos;re looking at. It&apos;s my goal to write a little bit for it each
            week, whether that be the code for the site or working on a draft blog post.
          </p>
        ),
        github: 'https://github.com/s-thom/sthom.kiwi',
        image: sthomKiwiImage,
        link: 'https://sthom.kiwi/',
      },
      {
        title: 'Infrastructure',
        description: (
          <p>
            In the background, I am trying out different ways of orchestrating any services I want to self-host, and how
            to manage the deployment and upgrading of them. It&apos;s a fairly slow and steady project at the moment,
            and I am using tools that I have not used before It&apos;s a complex topic, so rushing through is only going
            to lead to issues down the line.
          </p>
        ),
      },
    ],
    [],
  );
  const completedProjects = useMemo<Project[]>(
    () => [
      {
        title: 'the-index',
        description: (
          <>
            <p>
              the-index is a link bookmarking site with tags and searching. I made it because I was losing track of the
              tickets I had worked on previously at work, and found myself benefiting from having links to past tickets
              easily searchable.
            </p>
            <p>
              Signing up to the-index is not possible. You can contact me directly if you believe it would be useful to
              you. Alternatively, grab the Docker images and run it yourself.
            </p>
          </>
        ),
        github: 'https://github.com/s-thom/the-index',
        image: theIndexImage,
        link: 'https://the-index.sthom.kiwi/',
      },
      {
        title: 'EdNon',
        description: (
          <>
            <p>
              EdNon is an experiment into the IndexedDB APIs, and the implications of storing data on the client using
              async APIs. It also filled a need of mine at work, where I needed to keep track of the time I had spent on
              different tasks. With this, I was able to create as many timers and notes as I needed, without any extra
              menus.
            </p>
            <p>
              All data is stored locally on the browser. There is no server behind this application (apart from the web
              server).
            </p>
          </>
        ),
        github: 'https://github.com/s-thom/ednon',
        image: ednonImage,
        link: 'https://ednon.sthom.kiwi/',
      },
    ],
    [],
  );
  const dormantProjects = useMemo<Project[]>(
    () => [
      {
        title: 'Colour Tool',
        description: (
          <>
            <p>
              Initially a tool to help me compare colours, this project ended up being a journey down how colour is
              represented in computers, the features of different colour spaces, and just how much we take for granted
              when it comes to colour.
            </p>
            <p>
              In the future I want to extend this to have a more advanced colour picker, as well as better
              representations of the colour spaces, so that others can learn what I have only scratched the surface of.
            </p>
          </>
        ),
        github: 'https://github.com/s-thom/colour-tool',
        image: colourImage,
        link: 'https://colour.sthom.kiwi/',
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
      <ProjectList role="list">
        {activeProjects.map((project) => (
          <ProjectCard key={project.name} project={project} role="listitem" />
        ))}
      </ProjectList>
      <h1>Completed Projects</h1>
      <p>
        These are the lucky ones that have graduated to the promised land known as &quot;the done column of my projects
        board&quot;.
      </p>
      <ProjectList role="list">
        {completedProjects.map((project) => (
          <ProjectCard key={project.name} project={project} role="listitem" />
        ))}
      </ProjectList>
      <h1>Dormant Projects</h1>
      <p>These projects are currently lying in wait for either time or motivation.</p>
      <ProjectList role="list">
        {dormantProjects.map((project) => (
          <ProjectCard key={project.name} project={project} role="listitem" />
        ))}
      </ProjectList>
    </Layout>
  );
}
