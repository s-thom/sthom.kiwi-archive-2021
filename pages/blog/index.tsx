import styled from 'styled-components';
import { getAllPostsForHome, Post } from '../../src/api';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import PostPreview from '../../src/components/PostPreview';

const HeroContainer = styled.div`
  margin-bottom: 2em;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
`;

interface IndexProps {
  preview?: boolean;
  allPosts: { node: Post }[];
}

export default function Index({ allPosts }: IndexProps) {
  const heroPost = allPosts[0]?.node;
  const morePosts = allPosts.length > 0 ? allPosts.slice(1) : [];

  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
      ]}
    >
      <h1>My Blog</h1>
      <p>Sometimes I write things. Here they are:</p>
      {/* Make first post full-width */}
      {heroPost && (
        <HeroContainer>
          <Link href={`/blog/${heroPost._meta.uid}`} key={heroPost._meta.uid}>
            <PostPreview post={heroPost} />
          </Link>
        </HeroContainer>
      )}
      {/* Everything else is according to grid */}
      {morePosts.length > 0 && (
        <PostGrid>
          {morePosts.map(({ node }) => (
            <Link href={`/blog/${node._meta.uid}`} key={node._meta.uid}>
              <PostPreview post={node} />
            </Link>
          ))}
        </PostGrid>
      )}
    </Layout>
  );
}

export async function getStaticProps({ preview = false, previewData }: any) {
  const allPosts = await getAllPostsForHome(previewData);
  return {
    props: { preview, allPosts },
  };
}
