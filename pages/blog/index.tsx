import { RichText } from 'prismic-reactjs';
import { getAllPostsForHome, Post } from '../../src/api';
import Layout from '../../src/components/Layout';

interface IndexProps {
  preview?: boolean;
  allPosts: { node: Post }[];
}

export default function Index({ preview, allPosts }: IndexProps) {
  console.warn({ allPosts });

  // // const heroPost = allPosts[0].node
  // const morePosts = allPosts;
  // return <>{morePosts.length > 0 && morePosts.map((p) => <RichText render={p.node.title} />)}</>;
  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
      ]}
    />
  );
}

export async function getStaticProps({ preview = false, previewData }: any) {
  const allPosts = await getAllPostsForHome(previewData);
  return {
    props: { preview, allPosts },
  };
}
