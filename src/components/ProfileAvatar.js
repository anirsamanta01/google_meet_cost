import React from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/styles';

const ProfileAvatar = ({
  name,
  size = 52,
  backgroundColor,
  textColor,
  style,
  textStyle,
}) => {
  const initials = (name || 'U')
    .trim()
    .split(/\s+/)
    .map(part => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        {
          backgroundColor: backgroundColor || styles.avatar.backgroundColor,
          height: size,
          width: size,
        },
        style,
      ]}
    >
      <Text style={[styles.avatarText, { color: textColor || styles.avatarText.color }, textStyle]}>
        {initials}
      </Text>
    </View>
  );
};

export default ProfileAvatar;
