import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styles from '../assets/styles';
import useInvitePeople from '../hooks/useInvitePeople';
import SearchInput from '../components/SearchInput';
import PrimaryButton from '../components/PrimaryButton';
import ProfileAvatar from '../components/ProfileAvatar';
import ScreenHeader from '../components/ScreenHeader';

const InvitePeopleScreen = ({ route, onContinue }) => {
  const meeting = route?.params?.meeting;
  const {
    state: { error, filtered, isLoadingPeople, isSubmitting, query, selected, setQuery },
    handlers: { handleBack, handleContinue, toggle },
  } = useInvitePeople(meeting, onContinue);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          kicker="INVITE PEOPLE"
          onBack={handleBack}
          subtitle="Select everyone who should be in the room."
          title={meeting?.title || 'Your meeting'}
        />
        <SearchInput
          onChangeText={setQuery}
          placeholder="Search people"
          value={query}
        />
        {isLoadingPeople ? <Text style={styles.meta}>Loading people...</Text> : null}
        {!isLoadingPeople && !error && filtered.length === 0 ? (
          <Text style={styles.meta}>No people available to invite.</Text>
        ) : null}
        {filtered.map(person => {
          const isSelected = selected.includes(person.id);
          return (
            <Pressable
              key={person.id}
              onPress={() => toggle(person.id)}
              style={styles.person}
            >
              <ProfileAvatar name={person.name} size={40} />
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
        {!!error && <Text style={styles.error}>{error}</Text>}
        <PrimaryButton
          disabled={isSubmitting}
          onPress={handleContinue}
          title={
            isSubmitting
              ? 'Saving meeting...'
              : `Save meeting (${selected.length})`
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvitePeopleScreen;
