import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

const SplashScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    // Load custom fonts here if needed
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Simulate a delay or any other loading logic
      setTimeout(() => {
        navigation.replace('Login'); // Navigate to the Login screen
      }, 2000);
    }
  }, [fontsLoaded, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SplashScreen;
