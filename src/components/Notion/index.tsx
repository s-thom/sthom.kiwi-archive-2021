import 'katex/dist/katex.min.css';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { getCanonicalPageId } from 'notion-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-dropdown/assets/index.css';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import styled from 'styled-components';
import { useThemeMode } from '../../hooks/useThemeMode';
import Link from '../Link';

// @ts-ignore
const Equation = dynamic(() => import('react-notion-x').then((notion) => notion.Equation));
// @ts-ignore
const Collection = dynamic(() => import('react-notion-x').then((notion) => notion.Collection));
// @ts-ignore
const CollectionRow = dynamic(() => import('react-notion-x').then((notion) => notion.CollectionRow));
const Modal = dynamic(() => import('react-notion-x').then((notion) => notion.Modal), { ssr: false });
const Code = dynamic(() => import('../Code'));

const StyledNotionRenderer = styled(NotionRenderer)`
  font-family: inherit;

  &.light-mode {
    --fg-color: ${({ theme }) => theme.colors.text};
    --fg-color-0: rgba(55, 53, 47, 0.09);
    --fg-color-1: rgba(55, 53, 47, 0.16);
    --fg-color-2: rgba(55, 53, 47, 0.4);
    --fg-color-3: rgba(55, 53, 47, 0.6);
    --fg-color-4: #000;
    --fg-color-5: rgba(55, 53, 47, 0.024);
    --fg-color-6: rgba(55, 53, 47, 0.8);
    --fg-color-icon: var(--fg-color);

    --bg-color: ${({ theme }) => theme.colors.background};
    --bg-color-0: rgba(135, 131, 120, 0.15);
    --bg-color-1: rgb(247, 246, 243);
    --bg-color-2: rgba(135, 131, 120, 0.15);
  }

  &.dark-mode {
    --fg-color: ${({ theme }) => theme.colors.text};
    --fg-color-0: var(--fg-color);
    --fg-color-1: var(--fg-color);
    --fg-color-2: var(--fg-color);
    --fg-color-3: var(--fg-color);
    --fg-color-4: var(--fg-color);
    --fg-color-5: rgba(255, 255, 255, 0.7);
    --fg-color-6: #fff;
    --fg-color-icon: #fff;

    --bg-color: ${({ theme }) => theme.colors.background};
    --bg-color-0: rgb(71, 76, 80);
    --bg-color-1: rgb(63, 68, 71);
    --bg-color-2: rgba(135, 131, 120, 0.15);
  }

  .notion-page-cover {
    border-radius: 2em;
  }

  .notion-page.notion-page-has-cover {
    padding-top: 56px;
  }

  .notion-title {
    font-weight: 400;
  }

  .notion-viewport {
    position: absolute;
    width: 100%;
  }

  .notion-header {
    display: none;
  }

  .notion-gallery {
    width: 100%;
  }
`;

export interface NotionProps {
  recordMap: ExtendedRecordMap;
}

export default function Notion({ recordMap, ...rest }: NotionProps) {
  const { mode } = useThemeMode();

  return (
    <StyledNotionRenderer
      recordMap={recordMap}
      fullPage
      darkMode={mode === 'dark'}
      components={{
        code: Code,
        collection: Collection,
        collectionRow: CollectionRow,
        pageLink: Link,
        modal: Modal,
        equation: Equation,
      }}
      mapPageUrl={(id) => `/blog/posts/${getCanonicalPageId(id, recordMap)}`}
      {...rest}
    />
  );
}
