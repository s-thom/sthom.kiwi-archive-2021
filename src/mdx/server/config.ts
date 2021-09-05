// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
// import merge from 'deepmerge';
// import { defaultSchema } from 'hast-util-sanitize';
import { SerializeOptions } from 'next-mdx-remote/dist/types';
import autolink from 'rehype-autolink-headings';
// @ts-ignore
import format from 'rehype-format';
import katex from 'rehype-katex';
// import sanitize from 'rehype-sanitize';
import slug from 'rehype-slug';
import directive from 'remark-directive';
import emoji from 'remark-emoji';
import externalLinks from 'remark-external-links';
// @ts-ignore
import fixGuillemets from 'remark-fix-guillemets';
import footnotes from 'remark-footnotes';
// @ts-ignore
import hint from 'remark-hint';
import math from 'remark-math';
// @ts-ignore
import removeComments from 'remark-remove-comments';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import { syntaxTheme } from './theme';

const config: SerializeOptions = {
  scope: {},
  mdxOptions: {
    remarkPlugins: [
      [remarkShikiTwoslash, { theme: syntaxTheme }],
      a11yEmoji,
      directive,
      emoji,
      [externalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
      fixGuillemets,
      [footnotes, { inlineNotes: false }],
      math,
      hint,
      removeComments,
    ],
    rehypePlugins: [
      katex,
      slug,
      autolink,
      // [sanitize, merge(defaultSchema, {})],
      format,
    ],
  },
  target: ['esnext'],
};
export default config;
