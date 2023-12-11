import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../slices/countriesSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;
