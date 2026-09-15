import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../assets/styles';
import useInvitePeople from '../hooks/useInvitePeople';
import SearchInput from '../components/SearchInput';
import PrimaryButton from '../components/PrimaryButton';

const InvitePeopleScreen = ({ meeting, onContinue }) => {
  const {
    filtered,
    handleBack,
    handleContinue,
    query,
    selected,
    setQuery,
    toggle,
  } = useInvitePeople(meeting, onContinue);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={handleBack}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Text style={styles.kicker}>INVITE PEOPLE</Text>
        <Text style={styles.title}>{meeting?.title || 'Your meeting'}</Text>
        <Text style={styles.subtitle}>
          Select everyone who should be in the room.
        </Text>
        <SearchInput onChangeText={setQuery} placeholder="Search people" value={query} />
        {filtered.map(person => {
          const isSelected = selected.includes(person.id);
          return (
            <Pressable
              key={person.id}
              onPress={() => toggle(person.id)}
              style={styles.person}
            >
              <View style={styles.avatar}>
                <Text style={styles.initials}>{person.initials}</Text>
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.name}>{person.name}</Text>
                <Text style={styles.role}>{person.role}</Text>
              </View>
              <View style={[styles.checkbox, isSelected && styles.checked]}>
                {isSelected && <Text style={styles.check}>OK</Text>}
              </View>
            </Pressable>
          );
        })}
        <PrimaryButton onPress={handleContinue} title={`Review meeting (${selected.length})`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvitePeopleScreen;