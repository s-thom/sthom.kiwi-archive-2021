import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import PostPreview from '../../src/components/PostPreview';
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
          <Link href={`/blog/${slug}`} key={slug}>
            <PostPreview post={meta} />
          </Link>
        ))}
      </PostGrid>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({ params }) => {
  return {
    props: { allPosts: [{ slug: 'test', meta: { title: 'Test title', description: 'adesc' } }] },
  };
};
