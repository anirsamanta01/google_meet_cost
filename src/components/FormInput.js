import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from '../assets/styles';
import colors from '../assets/colors/colors';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete,
  multiline = false,
  numberOfLines,
  style,
  inputStyle,
  placeholderTextColor = colors.placeholder,
  ...props
}) => (
  <View>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <TextInput
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      style={[styles.input, inputStyle, style]}
      value={value}
      {...props}
    />
  </View>
);

export default FormInput;
