import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../assets/styles';
import useCreateMeeting from '../hooks/useCreateMeeting';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import { useState } from 'react';

const CreateMeetingScreen = ({ onContinue }) => {
  const {
    state: {
      date,
      dateValue,
      duration,
      error,
      setDuration,
      setTitle,
      time,
      timeValue,
      title,
    },
    handlers: {
      handleBack,
      handleContinue,
      handleDateChange,
      handleTimeChange,
    },
  } = useCreateMeeting(onContinue);
  const [pickerMode, setPickerMode] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="NEW MEETING"
          onBack={handleBack}
          subtitle="Add the basics, then invite the right people."
          title="Set the stage."
        />

        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardText}>MEETING DRAFT</Text>
          <Text style={styles.summaryCardValue}>
            {title || 'Untitled meeting'}
          </Text>
        </View>

        <View style={styles.formCard}>
          <FormInput
            label="MEETING NAME"
            onChangeText={setTitle}
            placeholder="e.g. Weekly product sync"
            value={title}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>DATE</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setPickerMode('date')}
                style={styles.input}
              >
                <Text style={styles.inputText}>{date}</Text>
              </Pressable>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>TIME</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setPickerMode('time')}
                style={styles.input}
              >
                <Text style={styles.inputText}>{time}</Text>
              </Pressable>
            </View>
          </View>

          {pickerMode ? (
            <DateTimePicker
              display="default"
              mode={pickerMode}
              onChange={(event, selectedValue) => {
                if (pickerMode === 'date') {
                  handleDateChange(event, selectedValue);
                } else {
                  handleTimeChange(event, selectedValue);
                }
                setPickerMode(null);
              }}
              value={pickerMode === 'date' ? dateValue : timeValue}
            />
          ) : null}

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
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}
        <PrimaryButton onPress={handleContinue} title="Invite people" />
        <Text style={styles.draftNote}>
          Attendees and cost will be added after you invite people.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMeetingScreen;
