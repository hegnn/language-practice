import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { useState } from 'react';

import { useWordStore, WordCard } from '@/storage/storage';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function TabTwoScreen() {
  const { addWord, words } = useWordStore();

  const [word, setWord] = useState<WordCard>({});

  const handleChange = (name: string, value: string) => {
    setWord({
      ...word,
      [name]: value,
    });
  };

  const disabled = !word.word || !word.meaning;

  const onSubmit = () => {
    if (word.word && word.meaning) addWord(word);
    Alert.alert('Your word successfully saved');
    setWord({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ padding: 20 }} behavior={'padding'}>
        <Input
          label='Word *'
          onChangeText={(text) => handleChange('word', text)}
          value={word.word}
          placeholder='word'
          autoCapitalize={'none'}
        />
        <Input
          label='Meaning *'
          onChangeText={(text) => handleChange('meaning', text)}
          value={word.meaning}
          placeholder='meaning'
          autoCapitalize={'none'}
        />
        <Input
          label='Article'
          onChangeText={(text) => handleChange('artikel', text)}
          value={word.artikel}
          placeholder='artikel'
          autoCapitalize={'none'}
        />
        <Input
          label='Sentence'
          onChangeText={(text) => handleChange('sentence', text)}
          value={word.sentence}
          placeholder='sentence'
          autoCapitalize={'none'}
        />
        <Button
          label='Save'
          onPress={onSubmit}
          disabled={disabled}
          style={{ marginTop: 20 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
});
