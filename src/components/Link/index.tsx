import NextLink from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function Link({ href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <StyledA {...props} />
    </NextLink>
  );
}
