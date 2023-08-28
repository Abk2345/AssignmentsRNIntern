// AsyncStorage with react-native
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [username, setUsername] = useState('');
  const [storedUsername, setStoredUsername] = useState('');

  // Load stored username when the app starts
  useEffect(() => {
    retrieveUsername();
  }, []);

  // on entry of username or any relevant data for applications save into asyncStorage
  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      console.log('Username saved:', username);
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  const retrieveUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        setStoredUsername(storedUsername);
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Save Username" onPress={saveUsername} />
      <Text style={styles.label}>Stored username:</Text>
      <Text>{storedUsername}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
});
