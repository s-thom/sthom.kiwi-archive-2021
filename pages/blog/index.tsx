import { promises as fs } from 'fs';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import path from 'path';
import styled from 'styled-components';
import Layout from '../../src/components/Layout';
import Link from '../../src/components/Link';
import PostPreview from '../../src/components/PostPreview';
import Tag from '../../src/components/Tag';
import { getFrontMatter } from '../../src/mdx/server';
import { PostMeta } from '../../src/types/post';

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
`;

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

const HalfText = styled.p`
  font-size: 0.8em;
  opacity: 0.7;
`;

interface IndexProps {
  posts: { slug: string; meta: PostMeta }[];
  tags: string[];
}

export default function Index({ posts, tags }: IndexProps) {
  return (
    <Layout
      breadcrumbs={[
        { path: '/', name: 'Home' },
        { path: '/blog', name: 'Blog' },
      ]}
      aside={
        <>
          <h3>All tags</h3>
          <TagList>
            {tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${encodeURI(tag)}`}>
                <Tag name={tag} />
              </Link>
            ))}
          </TagList>
        </>
      }
    >
      <NextSeo title="Blog | Stuart Thomson" />
      <h1>My Blog</h1>
      <p>Sometimes I write things. Here they are:</p>
      <PostGrid>
        {posts.length === 0 && <HalfText>I haven&apos;t finished writing yet. Check back later.</HalfText>}
        {posts.map(({ slug, meta }) => (
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

  return {
    props: { posts, tags },
  };
};
