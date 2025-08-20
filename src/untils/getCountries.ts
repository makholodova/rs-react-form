import countries from '../data/countries.json';

export default function getCountries() {
  return countries.map((country) => country.name);
}
