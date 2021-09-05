import { promises as fs } from 'fs';
import 'katex/dist/katex.min.css';
import { GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import path from 'path';
import styled from 'styled-components';
import Layout from '../../../src/components/Layout';
import Link from '../../../src/components/Link';
import Tag from '../../../src/components/Tag';
import { MdxRenderer } from '../../../src/mdx/client';
import { getMarkdownSource } from '../../../src/mdx/server';
import { PostMeta } from '../../../src/types/post';

const Warning = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.warning};
  background-color: ${({ theme }) => `${theme.colors.warning}44`};
  padding: 0.25em;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
`;

interface PostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: PostMeta;
}

export default function Post({ source, frontMatter }: PostProps) {
  const router = useRouter();
  const { slug } = router.query;

  if (!source || (!router.isFallback && !frontMatter.title)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
        { path: `/blog/posts/${slug}`, name: frontMatter.title },
      ]}
      aside={
        <>
          {frontMatter.tags && (
            <>
              <h3>Tags</h3>
              <TagList>
                {frontMatter.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tags/${encodeURI(tag)}`}>
                    <Tag name={tag} />
                  </Link>
                ))}
              </TagList>
            </>
          )}
        </>
      }
    >
      {!frontMatter.published && <Warning>This post is a draft and has not been published yet</Warning>}
      <NextSeo title={`${frontMatter.title} | Blog | Stuart Thomson`} description={frontMatter.description} />
      <MdxRenderer {...source} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PostProps, { slug: string }> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const filePath = path.join(process.cwd(), 'content/posts', `${decodeURI(params.slug)}.mdx`);
  const fileContents = await fs.readFile(filePath, 'utf8');

  const { frontMatter, source } = await getMarkdownSource(fileContents);

  return {
    props: {
      source,
      frontMatter,
    },
  };
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = await fs.readdir(postsDirectory);

  const paths = filenames
    .filter((filename) => filename.match(/\.mdx$/))
    .map((filename) => filename.match(/^(.*)\.mdx$/)![1])
    .map((slug) => `/blog/posts/${encodeURI(slug)}`);

  return {
    paths,
    fallback: true,
  };
}
