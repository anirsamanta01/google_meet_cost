import React from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/styles';

const ScreenHeader = ({
  kicker,
  title,
  subtitle,
  kickerStyle,
  titleStyle,
  subtitleStyle,
  children,
}) => (
  <View>
    {kicker ? <Text style={[styles.kicker, kickerStyle]}>{kicker}</Text> : null}
    {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
    {subtitle ? (
      <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
    ) : null}
    {children}
  </View>
);

export default ScreenHeader;
