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

  pre .popover {
    background-color: #3d3d3d;
  }

  pre .arrow {
    background-color: #3d3d3d;
    border-left: 1px solid #3d3d3d;
    border-top: 1px solid #3d3d3d;
  }

  pre .inline-completions ul.dropdown {
    background-color: #3d3d3d;
  }
`;

const components: Record<string, React.Component> = {};

export function MdxRenderer(props: MDXRemoteSerializeResult) {
  return (
    <Wrapper>
      <MDXRemote {...props} components={components} />
    </Wrapper>
  );
}
