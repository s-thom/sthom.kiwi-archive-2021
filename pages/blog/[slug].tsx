import { useRouter } from 'next/router';
import Image from 'next/image';
import ErrorPage from 'next/error';
import { RichText } from 'prismic-reactjs';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../src/api';
import Layout from '../../src/components/Layout';

export default function Post({ post, morePosts }) {
  const router = useRouter();

  if (!router.isFallback && !post?._meta?.uid) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
        { path: `/blog/${post._meta.uid}`, name: RichText.asText(post.title) },
      ]}
    >
      <RichText render={post.title} />

      {post.coverimage && <Image src={post.coverimage.url} width={800} height={600} quality={95} priority />}

      <RichText render={post.content} />
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostAndMorePosts(params.slug, previewData);

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? [],
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ node }) => `/blog/${node._meta.uid}`) || [],
    fallback: true,
  };
}
