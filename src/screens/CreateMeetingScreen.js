import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from '../assets/styles';
import colors from '../assets/colors/colors';
import useCreateMeeting from '../hooks/useCreateMeeting';

const CreateMeetingScreen = ({ onContinue }) => {
  const {
    date,
    duration,
    handleBack,
    handleContinue,
    setDate,
    setDuration,
    setTime,
    setTitle,
    time,
    title,
  } = useCreateMeeting(onContinue);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={handleBack}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Text style={styles.kicker}>NEW MEETING</Text>
        <Text style={styles.title}>Set the stage.</Text>
        <Text style={styles.subtitle}>
          Add the basics, then invite the right people.
        </Text>
        <Text style={styles.label}>MEETING NAME</Text>
        <TextInput
          onChangeText={setTitle}
          placeholder="e.g. Weekly product sync"
          placeholderTextColor={colors.placeholder}
          style={styles.input}
          value={title}
        />
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>DATE</Text>
            <TextInput
              onChangeText={setDate}
              style={styles.input}
              value={date}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>TIME</Text>
            <TextInput
              onChangeText={setTime}
              style={styles.input}
              value={time}
            />
          </View>
        </View>
        <Text style={styles.label}>DURATION</Text>
        <View style={styles.options}>
          {['30 minutes', '45 minutes', '60 minutes'].map(option => (
            <Pressable
              key={option}
              onPress={() => setDuration(option)}
              style={[styles.option, duration === option && styles.selected]}
            >
              <Text
                style={[
                  styles.optionText,
                  duration === option && styles.selectedText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={handleContinue} style={styles.button}>
          <Text style={styles.buttonText}>Invite people</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMeetingScreen;
