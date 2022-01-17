import { utcToZonedTime } from 'date-fns-tz';
import { CollectionPropertySchema, ExtendedRecordMap, PageBlock } from 'notion-types';

export function getPageDateProperty(propertyName: string, block: PageBlock, recordMap: ExtendedRecordMap): Date | null {
  if (!block.properties) {
    // TODO: check parent page?
    return null;
  }

  const collection = recordMap.collection[block.parent_id]?.value;

  if (collection) {
    const propertyId = Object.keys(collection.schema).find((key) => collection.schema[key]?.name === propertyName);

    if (propertyId) {
      const property = (block.properties as any)?.[propertyId]?.[0]?.[1]?.[0]?.[1];

      if (property) {
        const date: string = property.start_date;
        if (property.type === 'date') {
          return new Date(`${date}T00:00:00.000Z`);
        }
        if (property.type === 'datetime') {
          const time: string = property.start_time;
          const timezone: string = property.time_zone;

          return utcToZonedTime(`${date}T${time}:00.000`, timezone);
        }
      }
    }
  }

  return null;
}

export function getPropertySchema(
  propertyName: string,
  block: PageBlock,
  recordMap: ExtendedRecordMap,
): CollectionPropertySchema | null {
  if (!block.properties) {
    // TODO: check parent page?
    return null;
  }

  const collection = recordMap.collection[block.parent_id]?.value;

  if (collection) {
    const propertyId = Object.keys(collection.schema).find((key) => collection.schema[key]?.name === propertyName);

    if (propertyId) {
      return collection.schema[propertyId];
    }
  }

  return null;
}
