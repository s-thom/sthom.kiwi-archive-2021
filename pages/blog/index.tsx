import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';
import Notion from '../../src/components/Notion';

/* eslint-disable prefer-destructuring */
const NOTION_COLLECTION = process.env.NOTION_COLLECTION;
/* eslint-enable prefer-destructuring */
const notion = new NotionAPI();

const BlogListNotion = styled(Notion)`
  .notion-page {
    padding-top: 0;
    margin-top: 0 !important;
  }

  .notion-page-icon,
  .notion-title,
  .notion-collection-header {
    display: none;
  }

  .notion-gallery-grid {
    border-top: none;
  }

  .notion-gallery-grid > .notion-collection-card:first-child {
    grid-column: 1 / -1;
  }
`;

interface IndexProps {
  recordMap: ExtendedRecordMap | null;
}

export default function Index({ recordMap }: IndexProps) {
  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
      ]}
    >
      <NextSeo title="Blog | Stuart Thomson" />
      {recordMap && <BlogListNotion disableHeader recordMap={recordMap} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  if (!NOTION_COLLECTION) {
    throw new Error('Root page ID was not specified. Check the "NOTION_COLLECTION" environment variable');
  }

  const recordMap = await notion.getPage(NOTION_COLLECTION, { fetchCollections: true });

  return {
    props: { recordMap },
  };
};

export const config = {
  unstable_runtimeJS: false,
};
