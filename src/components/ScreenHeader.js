import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../assets/styles';

const ScreenHeader = ({
  kicker,
  title,
  subtitle,
  kickerStyle,
  titleStyle,
  subtitleStyle,
  onBack,
  backLabel = 'Back',
  children,
}) => (
  <View>
    {onBack ? (
      <Pressable onPress={onBack}>
        <Text style={styles.back}>{backLabel}</Text>
      </Pressable>
    ) : null}
    {kicker ? <Text style={[styles.kicker, kickerStyle]}>{kicker}</Text> : null}
    {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
    {subtitle ? (
      <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
    ) : null}
    {children}
  </View>
);

export default ScreenHeader;
