import {
  SCREEN_NAMES,
  MODAL_NAMES,
  SCREEN_NAMES_UNAUTHORIZED,
} from '@constants/navigation';

describe('navigation', () => {
  it('should have unique screen names across all screen groups', () => {
    const screenValues = Object.values(SCREEN_NAMES) as string[];
    const modalValues = Object.values(MODAL_NAMES) as string[];
    const unregisteredValues = Object.values(
      SCREEN_NAMES_UNAUTHORIZED,
    ) as string[];

    const all = [...screenValues, ...modalValues, ...unregisteredValues];
    const duplicates = all.filter((item, index) => all.indexOf(item) !== index);

    expect(duplicates).toEqual([]);
  });
});
