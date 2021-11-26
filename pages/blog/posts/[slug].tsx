import 'katex/dist/katex.min.css';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { getAllPagesInSpace, getPageTitle } from 'notion-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'prismjs/themes/prism-tomorrow.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-dropdown/assets/index.css';
import { Collection, CollectionRow, NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import Layout from '../../../src/components/Layout';

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const rootNotionSpaceId = process.env.NOTION_SPACE;
const rootNotionPageId = process.env.NOTION_COLLECTION;

const notion = new NotionAPI();

interface PostProps {
  recordMap: ExtendedRecordMap;
}

export default function Post({ recordMap }: PostProps) {
  const router = useRouter();
  const { slug } = router.query;

  if (!recordMap) {
    return null;
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
      <NotionRenderer
        recordMap={recordMap}
        fullPage
        darkMode={false}
        components={{
          collection: Collection,
          collectionRow: CollectionRow,
        }}
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

  try {
    const recordMap = await notion.getPage(params.slug);

    return {
      props: {
        recordMap,
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      notFound: true,
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

  if (!rootNotionPageId) {
    throw new Error('Root page ID was not specified. Check the "NOTION_COLLECTION" environment variable');
  }

  const pages = await getAllPagesInSpace(rootNotionPageId, rootNotionSpaceId, notion.getPage.bind(notion), {
    traverseCollections: false,
  });

  const paths = Object.keys(pages).map((pageId) => `/blog/posts/${pageId}`);

  return {
    paths,
    fallback: true,
  };
}
