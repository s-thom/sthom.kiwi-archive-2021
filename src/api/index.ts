import Prismic from 'prismic-javascript';
import { RichTextBlock } from 'prismic-reactjs';

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

export interface PreviewData {
  ref?: string;
}

interface FetchProps {
  previewData?: PreviewData;
  variables?: any;
}

export interface Image {
  alt?: string;
  copyright?: string;
  dimensions: {
    width: number;
    height: number;
  };
  url: string;
}

export interface Author {
  name: string;
  image?: Image;
}

export interface Post {
  date: string;
  title: RichTextBlock[];
  content: RichTextBlock[];
  coverimage: Image;
  excerpt: string;
  author?: Author;
  _meta: {
    uid: string;
  };
}

export type PostExcerpt = Omit<Post, 'content'>;

async function fetchAPI(query: string, { previewData, variables }: FetchProps = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(`${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`, {
    headers: {
      'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
      'Content-Type': 'application/json',
      'Accept-Language': API_LOCALE,
      Authorization: `Token ${API_TOKEN}`,
    } as HeadersInit,
  });

  if (res.status !== 200) {
    // console.log(await res.text());
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    // console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllPostsWithSlug(): Promise<{ node: Pick<Post, '_meta'> }[]> {
  const data = await fetchAPI(`
    {
      allPosts {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allPosts?.edges;
}

export async function getAllPostsForHome(previewData?: PreviewData): Promise<{ node: Post }[]> {
  const data = await fetchAPI(
    `
    query {
      allPosts(sortBy: date_DESC) {
        edges {
          node {
            date
            title
            content
            coverimage
            excerpt
            author {
              ...on Author {
                name
                picture
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  `,
    { previewData },
  );

  return data.allPosts.edges;
}

export async function getPostAndMorePosts(
  slug: string,
  previewData?: PreviewData,
): Promise<{ post: Post; morePosts: { node: PostExcerpt }[] }> {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String!, $lang: String!) {
    post(uid: $slug, lang: $lang) {
      title
      content
      date
      coverimage
      author {
        ...on Author {
          name
          picture
        }
      }
      _meta {
        uid
      }
    }
   morePosts: allPosts(sortBy: date_DESC, first: 3) {
      edges {
        node {
          title
          content
          date
          coverimage
          excerpt
          author {
            ...on Author {
              name
              picture
            }
          }
          _meta {
            uid
          }
        }
      }
    }
  }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    },
  );

  // eslint-disable-next-line no-underscore-dangle
  data.morePosts = data.morePosts.edges.filter(({ node }: any) => node._meta.uid !== slug).slice(0, 2);

  return data;
}
