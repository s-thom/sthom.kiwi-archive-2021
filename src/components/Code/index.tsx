import styled from 'styled-components';

const CodeWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 1em;
`;

const CodeContent = styled.div`
  min-width: 100%;
  width: max-content;

  & > .shiki {
    padding: 1em;
    tab-size: 2;
  }
`;

export interface CodeProps {
  language: string;
  /**
   * WARNING: This string will be inserted directly into the DOM as HTML.
   * Ensure it has been pre-processed first.
   */
  code: string;
}

export default function Code({ code }: CodeProps) {
  return (
    <CodeWrapper>
      <CodeContent dangerouslySetInnerHTML={{ __html: code }} />
    </CodeWrapper>
  );
}
