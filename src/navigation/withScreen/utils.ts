import { createTruthMapUsingArrayOfKeys, createMap } from '@services/maps';
import { NAVIGATOR_NAMES, MODAL_NAMES } from 'src/constants/navigation';

const PARENT_NAVIGATOR_NAMES = createMap(Object.values(NAVIGATOR_NAMES));

const MODAL_ROUTES_MAP = createTruthMapUsingArrayOfKeys(
  Object.values(MODAL_NAMES),
);

export const isNestedScreen = (name: string): boolean =>
  !PARENT_NAVIGATOR_NAMES[name] && !MODAL_ROUTES_MAP.has(name);
