import React from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/styles';

const CostCard = ({
  variant,
  label,
  value = '$0',
  note,
  duration,
  items = [],
}) => {
  if (variant === 'summary') {
    return (
      <View style={styles.summary}>
        {items.map(item => (
          <View key={item.label}>
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    );
  }

  const isDashboard = variant === 'dashboard';
  const numericValue = Number(String(value).replace(/[^\d.]/g, ''));

  return (
    <View style={isDashboard ? styles.costPanel : styles.costCard}>
      <Text style={isDashboard ? styles.panelLabel : styles.label}>
        {label}
      </Text>
      <Text style={isDashboard ? styles.total : styles.cost}>{value}</Text>

      {note ? (
        <Text style={isDashboard ? styles.panelNote : styles.note}>{note}</Text>
      ) : null}

      {!isDashboard && !note && duration && numericValue > 0 ? (
        <Text style={styles.note}>Based on attendee roles and {duration}.</Text>
      ) : null}
    </View>
  );
};

export default CostCard;
