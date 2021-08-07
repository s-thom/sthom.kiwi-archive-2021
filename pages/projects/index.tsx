import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';

import Layout from '../../src/components/Layout';

interface Project {
  name: React.ReactNode;
  image?: React.ReactNode;
  description?: React.ReactNode;
  link?: string;
  github?: string;
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
}

function ProjectCard({ project, ...rest }: ProjectCardProps) {
  const { name, image, description, link, github } = project;

  return <div {...rest}>placeholder</div>;
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
              This project was partially to solve a pet peeve of mine, but also to try and make a modern website without
              any framework at all. All images are embedded SVG, meaning the browser doesn&apos;t need to fetch
              additional resources to load.
            </p>
          </>
        ),
        github: 'https://github.com/s-thom/howtoscreenshot',
        image: 'https://screenshot.help/img/banner3.png',
        link: 'https://screenshot.help/',
      },
    ],
    [],
  );

  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/projects', name: 'Projects' },
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
          <ProjectCard project={project} role="listitem" />
        ))}
      </div>
      <h1>Completed Projects</h1>
      <p>These are the lucky ones that have graduated to the promised land known as &quot;done&quot;.</p>
      <h1>Dormant Projects</h1>
      <p>These projects are currently lying in wait for either time or motivation.</p>
    </Layout>
  );
}
