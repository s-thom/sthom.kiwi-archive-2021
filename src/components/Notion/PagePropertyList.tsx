import { format } from 'date-fns-tz';
import { ExtendedRecordMap, PageBlock } from 'notion-types';
import { getPageProperty } from 'notion-utils';
import { cs } from 'react-notion-x';
import styled from 'styled-components';
import { getPageDateProperty, getPropertySchema } from './util';

const PagePropertyListWrapper = styled.div`
  margin-bottom: 1.2em;
`;

const DATE_FORMAT = 'do MMM yyy';
const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

function formatNzDate(date: Date) {
  return format(date, DATE_FORMAT);
}

function formatISODate(date: Date) {
  return format(date, ISO_FORMAT);
}

interface PagePropertyListProps {
  recordMap: ExtendedRecordMap;
  block: PageBlock;
}

export default function PagePropertyList({ recordMap, block }: PagePropertyListProps) {
  const tags = getPageProperty('Tags', block, recordMap);
  const published = getPageDateProperty('Publish', block, recordMap);
  const edited = getPageDateProperty('Edit', block, recordMap);

  const values = (tags || '').split(',');

  const tagsSchema = getPropertySchema('Tags', block, recordMap);

  return (
    <PagePropertyListWrapper>
      {tags && tagsSchema && (
        <div>
          <span className={`notion-property notion-property-${tagsSchema.type}`}>
            {values.map((value) => {
              const option = tagsSchema.options?.find((o) => value === o.value);
              const color = option?.color;

              return (
                <div
                  key={value}
                  className={cs(`notion-property-${tagsSchema.type}-item`, color && `notion-item-${color}`)}
                >
                  {value}
                </div>
              );
            })}
          </span>
        </div>
      )}
      {(published || edited) && (
        <div>
          {published && (
            <>
              <span>Published: </span>
              <time dateTime={formatISODate(published)}>{formatNzDate(published)}</time>
            </>
          )}
          {published && edited && <br />}
          {edited && (
            <em>
              <span>Edited: </span>
              <time dateTime={formatISODate(edited)}>{formatNzDate(edited)}</time>
            </em>
          )}
        </div>
      )}
    </PagePropertyListWrapper>
  );
}
