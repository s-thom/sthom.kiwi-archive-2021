import { RichText } from 'prismic-reactjs';
import { useMemo } from 'react';
import styled from 'styled-components';
import { Post } from '../../api';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  padding: 1em;
  display: grid;

  background-position: center;
  background-size: cover;

  grid-template-areas:
    'gap'
    'title'
    'excerpt'
    'date';

  @media (${({ theme }) => theme.mediaQueries.tablet}) {
    grid-template-areas:
      'gap gap'
      'title title'
      'excerpt date';
  }
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0;
`;

const Excerpt = styled.p`
  grid-area: excerpt;
  margin: 0;
  font-size: 0.8em;
`;

export interface PostPreviewProps {
  post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const background = useMemo(() => {
    if (!post.coverimage) {
      return 'transparent';
    }

    return `linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${post.coverimage.url})`;
  }, [post.coverimage]);

  return (
    <Container style={{ background }}>
      {post.title && <Title>{RichText.asText(post.title)}</Title>}
      {post.excerpt && <Excerpt>{post.excerpt}</Excerpt>}
    </Container>
  );
}
