import { promises as fs } from 'fs';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import path from 'path';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import PostPreview from '../../src/components/PostPreview';
import { getFrontMatter } from '../../src/mdx';
import { PostMeta } from '../../src/types/post';

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  @media (${({ theme }) => theme.mediaQueries.tablet}) {
    grid-template-columns: 1fr 1fr;

    & > *:first-child {
      grid-column: 1 /-1;
    }
  }
`;

interface IndexProps {
  allPosts: { slug: string; meta: PostMeta }[];
}

export default function Index({ allPosts }: IndexProps) {
  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
      ]}
    >
      <NextSeo title="Blog | Stuart Thomson" />
      <h1>My Blog</h1>
      <p>Sometimes I write things. Here they are:</p>
      <PostGrid>
        {allPosts.map(({ slug, meta }) => (
          <Link href={`/blog/posts/${slug}`} key={slug}>
            <PostPreview post={meta} />
          </Link>
        ))}
      </PostGrid>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
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

  // Filter to only published posts
  const posts = allFiles.filter(({ meta }) => !!meta.published);

  return {
    props: { allPosts: posts },
  };
};
