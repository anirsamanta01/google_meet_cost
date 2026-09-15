import React from 'react';
import { TextInput } from 'react-native';
import styles from '../assets/styles';
import colors from '../assets/colors/colors';

const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search',
  style,
  ...props
}) => (
  <TextInput
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={colors.placeholder}
    style={[styles.search, style]}
    value={value}
    {...props}
  />
);

export default SearchInput;
