import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Country from '../components/Country';

describe('Country Component', () => {
  it('displays modal with country details on press', () => {
    const mockCountry = { name: 'Republic of South Africa', code: 'ZA' };
    const handlePress = jest.fn();
    const { getByText } = render(<Country item={mockCountry} onPress={handlePress} />);

    fireEvent.press(getByText('Republic of South Africa (ZA)'));
    expect(handlePress).toHaveBeenCalledWith(mockCountry);
  });
});
