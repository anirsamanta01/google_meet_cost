import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from '../assets/styles';

const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  children,
}) => (
  <Pressable onPress={onPress} disabled={disabled} style={[styles.button, style]}>
    <Text style={[styles.buttonText, textStyle]}>
      {children ?? title}
    </Text>
  </Pressable>
);

export default PrimaryButton;
