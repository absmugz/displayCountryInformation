import 'react-native';
import React from 'react';
import App from '../App';
import { useSelector, useDispatch } from 'react-redux';
import renderer from 'react-test-renderer';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock data and implementation
const mockCountriesState = {
  countries: {
    countries: [
      {
        name: 'Country A',
        code: 'CA',
        capital: 'Capital A',
        population: 1000000,
        region: 'Region A',
        flag: 'https://example.com/flag-a.png'
      },
      {
        name: 'Country B',
        code: 'CB',
        capital: 'Capital B',
        population: 2000000,
        region: 'Region B',
        flag: 'https://example.com/flag-b.png'
      },
      {
        name: 'Country C',
        code: 'CC',
        capital: 'Capital C',
        population: 3000000,
        region: 'Region C',
        flag: 'https://example.com/flag-c.png'
      }
    ],
  },
};


useDispatch.mockImplementation(() => jest.fn());
useSelector.mockImplementation(selector => selector(mockCountriesState));

it('renders correctly', () => {
  renderer.create(<App />);
});
