import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import {
  getAllPagesInSpace,
  getCanonicalPageId,
  getPageContentBlockIds,
  getPageTitle,
  parsePageId,
} from 'notion-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-dropdown/assets/index.css';
import 'react-notion-x/src/styles.css';
import styled from 'styled-components';
import Layout from '../../../src/components/Layout';
import Notion from '../../../src/components/Notion';
import { blog, blogPost, home } from '../../../src/paths';
import { highlightCode } from '../../../src/shiki';

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
/* eslint-disable prefer-destructuring */
const NOTION_SPACE = process.env.NOTION_SPACE;
const NOTION_ALLOW_ALL_SPACES = process.env.NOTION_ALLOW_ALL_SPACES === 'true';
const NOTION_COLLECTION = process.env.NOTION_COLLECTION;
/* eslint-enable prefer-destructuring */
const notion = new NotionAPI();

const BlogPageNotion = styled(Notion)`
  .notion-title + .notion-collection-row {
    display: none;
  }
`;

interface PostProps {
  recordMap: ExtendedRecordMap | null;
}

export default function Post({ recordMap }: PostProps) {
  const router = useRouter();
  const { slug } = router.query;

  if (!recordMap) {
    return (
      <Layout
        breadcrumbs={[
          { path: home({}), name: 'Home' },
          { path: blog({}), name: 'Blog' },
          { path: blogPost({ slug: slug as string }), name: 'Loading...' },
        ]}
      >
        <NextSeo title="Loading... | Blog | Stuart Thomson" />
      </Layout>
    );
  }

  const title = getPageTitle(recordMap);

  return (
    <Layout
      breadcrumbs={[
        { path: home({}), name: 'Home' },
        { path: blog({}), name: 'Blog' },
        { path: blogPost({ slug: slug as string }), name: title },
      ]}
    >
      {/* {!frontMatter.published && <Warning>This post is a draft and has not been published yet</Warning>} */}
      <NextSeo title={`${title} | Blog | Stuart Thomson`} />
      <BlogPageNotion disableHeader recordMap={recordMap} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PostProps, { slug: string }> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const slug = params.slug.toLowerCase();

  let pageId: string;
  try {
    pageId = parsePageId(slug);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error trying to resolve page ID from ${slug} `, err);
    return {
      notFound: true,
    };
  }

  let recordMap: ExtendedRecordMap;
  try {
    recordMap = await notion.getPage(pageId);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error trying to get record map for page ${pageId}`, err);
    return {
      notFound: true,
    };
  }

  const spaceId = recordMap.block[pageId]?.value?.space_id;
  if (!NOTION_ALLOW_ALL_SPACES && spaceId !== NOTION_SPACE) {
    return {
      notFound: true,
    };
  }

  const allBlockIds = getPageContentBlockIds(recordMap);
  for (const blockId of allBlockIds) {
    const block = recordMap.block[blockId]?.value;
    if (block) {
      if (block.type === 'code') {
        // Override the content of the code block to be the highlighted code by Shiki.
        // This is done at this stage, as extra build steps would be required to get it running in the browser.
        // eslint-disable-next-line no-await-in-loop
        const html = await highlightCode(block);
        if (html) {
          block.properties.title[0][0] = html;
        }
      }
    }
  }

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  if (!NOTION_COLLECTION) {
    throw new Error('Root page ID was not specified. Check the "NOTION_COLLECTION" environment variable');
  }

  const pages = await getAllPagesInSpace(NOTION_COLLECTION, NOTION_SPACE, notion.getPage.bind(notion), {
    traverseCollections: false,
  });

  const allPageIds = Object.keys(pages);
  const pageIds = allPageIds.filter((pageId) => pageId !== NOTION_COLLECTION);
  const paths = pageIds.map((pageId) => {
    let slug = pageId;
    if (pages[pageId]) {
      slug = getCanonicalPageId(pageId, pages[pageId]!) ?? pageId;
    }
    return blogPost({ slug });
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export const config = {
  unstable_runtimeJS: false,
};
