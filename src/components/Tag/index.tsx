import styled from 'styled-components';

const TagContainer = styled.div``;

const TagRibbon = styled.span`
  display: inline-block;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-left: none;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-left: 1.1em;
  padding: 0.25em;
  line-height: 1em;

  &::before {
    position: absolute;
    border-top: 1px solid ${({ theme }) => theme.colors.text};
    border-left: 1px solid ${({ theme }) => theme.colors.text};
    content: ' ';
    width: 1.0606em;
    height: 1.0606em;
    top: 50%;
    left: 0;
    transform: rotate(-45deg) translateY(-70.711%);
  }

  &::after {
    position: absolute;
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: 50%;
    content: ' ';
    width: 0.25em;
    height: 0.25em;
    top: 50%;
    left: -0.25em;
    transform: rotate(-45deg) translateY(-50%);
  }
`;

export interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <TagContainer>
      <TagRibbon>{name}</TagRibbon>
    </TagContainer>
  );
}
