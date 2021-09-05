import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { PostMeta } from '../../types/post';
import config from './config';

export interface MarkdownSource {
  source: MDXRemoteSerializeResult;
  frontMatter: PostMeta;
}

export async function getFrontMatter(mdx: string): Promise<PostMeta> {
  const { data } = matter(mdx);
  return data as PostMeta;
}

export async function getMarkdownSource(mdx: string): Promise<MarkdownSource> {
  const { content, data } = matter(mdx);
  const source = await serialize(content, config);
  return {
    source,
    frontMatter: data as PostMeta,
  };
}
