export const createMap = (
  items: readonly string[] | string[],
): Record<string, true> => {
  const map: Record<string, true> = {};
  for (const item of items) {
    map[item] = true;
  }
  return map;
};

export const createTruthMapUsingArrayOfKeys = (
  items: readonly string[] | string[],
): Map<string, true> => new Map(items.map(item => [item, true]));
