import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';
import styled from 'styled-components';
import { ShikiCss } from './shiki';

const Wrapper = styled(ShikiCss)`
  pre.shiki {
    border-left: 0;
    border-bottom: 0;
  }

  pre .code-container {
    padding-bottom: 1px;
  }

  /* pre.twoslash data-lsp:hover::before {
    position:sticky;
  } */
`;

const components: Record<string, React.Component> = {};

export function MdxRenderer(props: MDXRemoteSerializeResult) {
  return (
    <Wrapper>
      <MDXRemote {...props} components={components} />
    </Wrapper>
  );
}
