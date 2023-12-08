import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Country from '../components/Country';

describe('Country Component', () => {
  it('displays modal with country details on press', () => {
    const mockCountry = { name: 'Canada', code: 'CA' };
    const handlePress = jest.fn();
    const { getByText } = render(<Country item={mockCountry} onPress={handlePress} />);

    fireEvent.press(getByText('Canada (CA)'));
    expect(handlePress).toHaveBeenCalledWith(mockCountry);
  });
});
