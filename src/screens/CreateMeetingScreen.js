import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useCreateMeeting from '../hooks/useCreateMeeting';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

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
        <FormInput
          label="MEETING NAME"
          onChangeText={setTitle}
          placeholder="e.g. Weekly product sync"
          value={title}
        />
        <View style={styles.row}>
          <View style={styles.half}>
            <FormInput
              label="DATE"
              onChangeText={setDate}
              value={date}
            />
          </View>
          <View style={styles.half}>
            <FormInput
              label="TIME"
              onChangeText={setTime}
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
        <PrimaryButton onPress={handleContinue} title="Invite people" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMeetingScreen;
