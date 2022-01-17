import 'katex/dist/katex.min.css';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { getCanonicalPageId } from 'notion-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-dropdown/assets/index.css';
import { NotionRenderer, NotionRendererProps } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import styled from 'styled-components';
import { blogPost } from '../../paths';
import Link from '../Link';

// @ts-ignore
const Equation = dynamic(() => import('react-notion-x').then((notion) => notion.Equation));
// @ts-ignore
const Collection = dynamic(() => import('react-notion-x').then((notion) => notion.Collection));
// @ts-ignore
const CollectionRow = dynamic(() => import('./PagePropertyList'));
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

  .notion-page-cover {
    border-radius: 2em;
  }

  .notion-page.notion-page-has-cover {
    padding-top: 56px;

    & > .notion-page-icon-wrapper {
      height: 1px;
    }
  }

  .notion-title,
  .notion-h {
    font-weight: 400;
  }

  .notion-viewport {
    position: absolute;
    width: 100%;
  }

  .notion-gallery {
    width: 100%;
  }

  .notion-collection-card {
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: 1em;
  }
`;

export interface NotionProps extends NotionRendererProps {
  recordMap: ExtendedRecordMap;
}

export default function Notion({
  recordMap,
  fullPage = true,
  hideBlockId = true,
  darkMode = false,
  showCollectionViewDropdown = false,
  components,
  ...rest
}: NotionProps) {
  return (
    <StyledNotionRenderer
      recordMap={recordMap}
      fullPage={fullPage}
      hideBlockId={hideBlockId}
      darkMode={darkMode}
      showCollectionViewDropdown={showCollectionViewDropdown}
      components={{
        code: Code,
        collection: Collection,
        collectionRow: CollectionRow,
        pageLink: Link,
        modal: Modal,
        equation: Equation,
        ...components,
      }}
      mapPageUrl={(id) => blogPost({ slug: getCanonicalPageId(id, recordMap)! })}
      {...rest}
    />
  );
}
