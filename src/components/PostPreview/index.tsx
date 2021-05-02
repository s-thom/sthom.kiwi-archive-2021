import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';
import { Post } from '../../api';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  padding: 1em;
`;

export interface PostPreviewProps {
  post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <Container>
      <RichText render={post.title} />
    </Container>
  );
}
