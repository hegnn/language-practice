import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}> {label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={styles.textInput}
          placeholderTextColor={Colors.dark.placeholder}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { color: Colors.dark.text, marginBottom: 5 },
  inputContainer: {
    backgroundColor: Colors.dark.inputField,

    borderRadius: 10,
    overflow: 'hidden',
  },
  textInput: {
    height: 40,
    paddingHorizontal: 15,
    color: Colors.dark.text,
  },
});
