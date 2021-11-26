import 'katex/dist/katex.min.css';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import ErrorPage from 'next/error';
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
import { Collection, NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import styled from 'styled-components';
import Layout from '../../../src/components/Layout';
import Link from '../../../src/components/Link';
import { useThemeMode } from '../../../src/hooks/useThemeMode';
import { highlightCode } from '../../../src/shiki';

// @ts-ignore
const Equation = dynamic(() => import('react-notion-x').then((notion) => notion.Equation));

const Modal = dynamic(() => import('react-notion-x').then((notion) => notion.Modal), { ssr: false });

const Code = dynamic(() => import('../../../src/components/Code'));

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
/* eslint-disable prefer-destructuring */
const NOTION_SPACE = process.env.NOTION_SPACE;
const NOTION_COLLECTION = process.env.NOTION_COLLECTION;
/* eslint-enable prefer-destructuring */
const notion = new NotionAPI();

const StyledNotionRenderer = styled(NotionRenderer)`
  &.light-mode {
    --fg-color: ${({ theme }) => theme.colors.text};
    --fg-color-0: rgba(55, 53, 47, 0.09);
    --fg-color-1: rgba(55, 53, 47, 0.16);
    --fg-color-2: rgba(55, 53, 47, 0.4);
    --fg-color-3: rgba(55, 53, 47, 0.6);
    --fg-color-4: #000;
    --fg-color-5: rgba(55, 53, 47, 0.024);
    --fg-color-6: rgba(55, 53, 47, 0.8);
    --fg-color-icon: var(--fg-color);

    --bg-color: ${({ theme }) => theme.colors.background};
    --bg-color-0: rgba(135, 131, 120, 0.15);
    --bg-color-1: rgb(247, 246, 243);
    --bg-color-2: rgba(135, 131, 120, 0.15);
  }

  &.dark-mode {
    --fg-color: ${({ theme }) => theme.colors.text};
    --fg-color-0: var(--fg-color);
    --fg-color-1: var(--fg-color);
    --fg-color-2: var(--fg-color);
    --fg-color-3: var(--fg-color);
    --fg-color-4: var(--fg-color);
    --fg-color-5: rgba(255, 255, 255, 0.7);
    --fg-color-6: #fff;
    --fg-color-icon: #fff;

    --bg-color: ${({ theme }) => theme.colors.background};
    --bg-color-0: rgb(71, 76, 80);
    --bg-color-1: rgb(63, 68, 71);
    --bg-color-2: rgba(135, 131, 120, 0.15);
  }

  .notion-viewport {
    position: absolute;
    width: 100%;
  }

  .notion-header {
    display: none;
  }
`;

function CollectionRow() {
  return null;
}

interface PostProps {
  recordMap: ExtendedRecordMap | null;
  reason?: string;
}

export default function Post({ recordMap, reason }: PostProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { mode } = useThemeMode();

  if (!recordMap) {
    return <ErrorPage statusCode={404} title={reason} />;
  }

  const title = getPageTitle(recordMap);

  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
        { path: `/blog/posts/${slug}`, name: title },
      ]}
    >
      {/* {!frontMatter.published && <Warning>This post is a draft and has not been published yet</Warning>} */}
      <NextSeo title={`${title} | Blog | Stuart Thomson`} />
      <StyledNotionRenderer
        recordMap={recordMap}
        fullPage
        darkMode={mode === 'dark'}
        components={{
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          pageLink: Link,
          modal: Modal,
          equation: Equation,
        }}
        mapPageUrl={(id) => `/blog/posts/${getCanonicalPageId(id, recordMap)}`}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PostProps, { slug: string }> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const pageId = parsePageId(params.slug);

  try {
    const recordMap = await notion.getPage(pageId);
    const spaceId = recordMap.block[pageId]?.value?.space_id;
    if (spaceId !== NOTION_SPACE) {
      return {
        props: {
          recordMap: null,
          reason: `wrong space (${spaceId})`,
        },
        revalidate: 10,
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
  } catch (err) {
    return {
      props: {
        recordMap: null,
        reason: `error: ${err instanceof Error ? err.toString() : 'unknown'}`,
      },
      revalidate: 10,
    };
  }
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
  const paths = pageIds.map((pageId) => `/blog/posts/${pageId}`);

  return {
    paths,
    fallback: true,
  };
}
