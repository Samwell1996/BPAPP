export function normalize<T extends { id: string | number }>(
  items: T[],
  entityKey: string,
) {
  const entities: Record<string, Record<string | number, T>> = {
    [entityKey]: {},
  };

  const result: (string | number)[] = [];

  for (const item of items) {
    const id = item.id;
    entities[entityKey][id] = item;
    result.push(id);
  }

  return { entities, result };
}
