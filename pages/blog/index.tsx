import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { getAllPostsForHome, Post } from '../../src/api';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import PostPreview from '../../src/components/PostPreview';

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
  preview?: boolean;
  allPosts: { node: Post }[];
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
        {allPosts.map(({ node }) => (
          <Link href={`/blog/${node._meta.uid}`} key={node._meta.uid}>
            <PostPreview post={node} />
          </Link>
        ))}
      </PostGrid>
    </Layout>
  );
}

export async function getStaticProps({ preview = false, previewData }: any) {
  const allPosts = await getAllPostsForHome(previewData);
  return {
    props: { preview, allPosts },
  };
}
