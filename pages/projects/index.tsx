import { NextSeo } from 'next-seo';
import React from 'react';
import Layout from '../../src/components/Layout';

export default function ProjectsPage() {
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
      <h1>Completed Projects</h1>
      <p>These are the lucky ones that have graduated to the promised land known as &quot;done&quot;.</p>
      <h1>Dormant Projects</h1>
      <p>These projects are currently lying in wait for either time or motivation.</p>
    </Layout>
  );
}
