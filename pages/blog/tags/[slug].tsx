import { promises as fs } from 'fs';
import 'katex/dist/katex.min.css';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import path from 'path';
import React from 'react';
import styled from 'styled-components';
import Layout from '../../../src/components/Layout';
import Link from '../../../src/components/Link';
import PostPreview from '../../../src/components/PostPreview';
import { getFrontMatter } from '../../../src/mdx/server';
import { PostMeta } from '../../../src/types/post';

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  @media (${({ theme }) => theme.mediaQueries.blog.tablet}) {
    grid-template-columns: 1fr 1fr;

    & > *:first-child {
      grid-column: 1 /-1;
    }
  }
`;

interface TaggedPostsProps {
  tag: string;
  posts: { slug: string; meta: PostMeta }[];
}

export default function TaggedPosts({ tag, posts }: TaggedPostsProps) {
  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
        { path: `/blog/tags/${encodeURI(tag)}`, name: `Tagged: ${tag}` },
      ]}
    >
      <NextSeo title={`Tagged: ${tag} | Stuart Thomson`} />
      <h1>{`Tagged: ${tag}`}</h1>
      <PostGrid>
        {posts?.map(({ slug, meta }) => (
          <Link href={`/blog/posts/${slug}`} key={slug}>
            <PostPreview post={meta} />
          </Link>
        ))}
      </PostGrid>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<TaggedPostsProps, { slug: string }> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const tag = decodeURI(params.slug);

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = await fs.readdir(postsDirectory);

  // Read frontmatter of all files
  const allFiles = await Promise.all(
    filenames
      .filter((filename) => filename.match(/\.mdx$/))
      .map<Promise<{ slug: string; meta: PostMeta }>>(async (filename) => {
        const slug = filename.match(/^(.*)\.mdx$/)![1];

        const fileContents = await fs.readFile(path.join(postsDirectory, filename), 'utf8');

        const meta = await getFrontMatter(fileContents);

        return {
          slug: encodeURI(slug),
          meta,
        };
      }),
  );

  // Filter to only published posts with the correct tag
  const posts = allFiles
    .filter(({ meta }) => !!meta.published)
    .filter(({ meta }) => meta.tags && meta.tags.includes(tag));

  if (posts.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      tag,
      posts,
    },
  };
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = await fs.readdir(postsDirectory);

  // Read frontmatter of all files
  const allFiles = await Promise.all(
    filenames
      .filter((filename) => filename.match(/\.mdx$/))
      .map<Promise<{ slug: string; meta: PostMeta }>>(async (filename) => {
        const slug = filename.match(/^(.*)\.mdx$/)![1];

        const fileContents = await fs.readFile(path.join(postsDirectory, filename), 'utf8');

        const meta = await getFrontMatter(fileContents);

        return {
          slug: encodeURI(slug),
          meta,
        };
      }),
  );

  const tags: string[] = [];
  // Find tags in published posts
  allFiles
    .filter(({ meta }) => !!meta.published)
    .forEach(({ meta }) => {
      if (meta.tags) {
        meta.tags.forEach((tag) => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
    });

  const paths = tags.map((tag) => `/blog/tags/${encodeURI(tag)}`);

  return {
    paths,
    fallback: true,
  };
}
