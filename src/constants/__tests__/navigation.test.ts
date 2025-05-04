import { SCREEN_NAMES, MODAL_NAMES } from '@constants/navigation';

describe('navigation', () => {
  it('should have unique screen names', () => {
    const screenValues = Object.values(SCREEN_NAMES) as string[];
    const modalValues = Object.values(MODAL_NAMES) as string[];

    const duplicates = screenValues.filter(value =>
      modalValues.includes(value),
    );

    expect(duplicates).toEqual([]);
  });
});
