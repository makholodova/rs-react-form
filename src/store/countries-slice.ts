import { createSlice } from '@reduxjs/toolkit';
import getCountries from '../untils/getCountries.ts';

const countries = getCountries();
const initialState: { countries: string[] } = {
  countries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
