import getCountries from '../untils/getCountries.ts';

vi.mock('../data/countries.json', () => ({
  default: [
    { code: 'US', name: 'United States' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ],
}));

describe('getCountries', () => {
  it('returns a list of country names', () => {
    const result = getCountries();
    expect(result).toEqual(['United States', 'Germany', 'France']);
  });
});
