import 'katex/dist/katex.min.css';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import { getMarkdownSource } from '../../src/mdx';
import { PostMeta } from '../../src/types/post';

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
        { path: `/blog/${slug}`, name: frontMatter.title },
      ]}
    >
      <NextSeo title={`${frontMatter.title} | Blog | Stuart Thomson`} description={frontMatter.description} />
      <MDXRemote {...source} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  // TODO: Get file content from `params.slug`

  const { frontMatter, source } = await getMarkdownSource("---\ntitle: 'hello'\n---\n# hello\n\nworld");

  return {
    props: {
      source,
      frontMatter,
    },
  };
};

// TODO: List all files
export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug();
  return {
    paths: ['/blog/test'],
    fallback: true,
  };
}
