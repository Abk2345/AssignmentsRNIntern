// CustomButton for the purpose of changing styles and other modifications
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, type, onPress, selected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      type === "submit" ? styles.submitButton : styles.appButtonContainer,
      selected ? styles.selectedButton : styles.unselectedButton,
      
    ]}
  >
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  selectedButton: {
    backgroundColor: '#7D4F46',
    borderColor: 'blue',
  },
  unselectedButton: {
    backgroundColor: '#1A7507',
    borderColor: 'gray',
  },
  submitButton: {

        backgroundColor: '#1A7507',
        color: '#fff',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
