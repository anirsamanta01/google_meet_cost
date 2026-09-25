import React from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../assets/styles';
import colors from '../assets/colors/colors';

const ScreenHeader = ({
  kicker,
  title,
  subtitle,
  kickerStyle,
  titleStyle,
  subtitleStyle,
  onBack,
  children,
}) => (
  <View>
    {onBack ? (
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        hitSlop={8}
        onPress={onBack}
        style={styles.backButton}
      >
        <MaterialCommunityIcons
          color={colors.primary}
          name="arrow-left"
          size={26}
        />
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
