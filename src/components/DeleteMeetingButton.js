import React from 'react';
import { Alert, Pressable, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../assets/styles';

const DeleteMeetingButton = ({ meeting, onDelete }) => {
  const confirmDelete = () => {
    Alert.alert('Delete meeting', `Delete "${meeting.title}" permanently?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(meeting.id),
      },
    ]);
  };

  return (
    <Pressable
      accessibilityLabel={`Delete ${meeting.title}`}
      hitSlop={8}
      onPress={confirmDelete}
      style={styles.deleteButton}
    >
      {/* <MaterialCommunityIcons
        name="trash-can-outline"
        size={20}
        color={styles.deleteIcon.color}
      /> */}
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  );
};

export default DeleteMeetingButton;
