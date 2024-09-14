import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';

export default function TabTwoScreen() {
  const { saveNewWord } = useData();
  const [word, setWord] = useState({
    word: '',
    artikel: '',
    sentence: '',
    meaning: '',
  });

  const handleChange = (name: string, value: string) => {
    setWord({
      ...word,
      [name]: value,
    });
  };

  const disabled = !word.word || !word.meaning;

  const onSubmit = () => {
    if (word.word && word.meaning) saveNewWord(word);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        label='word'
        onChangeText={(text) => handleChange('word', text)}
        value={word.word}
        placeholder='word'
        autoCapitalize={'none'}
        style={{ color: Colors.dark.text }}
      />
      <Input
        label='meaning'
        onChangeText={(text) => handleChange('meaning', text)}
        value={word.meaning}
        placeholder='meaning'
        autoCapitalize={'none'}
        style={{ color: Colors.dark.text }}
      />
      <Input
        label='artikel'
        onChangeText={(text) => handleChange('artikel', text)}
        value={word.artikel}
        placeholder='artikel'
        autoCapitalize={'none'}
        style={{ color: Colors.dark.text }}
      />
      <Input
        label='sentence'
        onChangeText={(text) => handleChange('sentence', text)}
        value={word.sentence}
        placeholder='sentence'
        autoCapitalize={'none'}
        style={{ color: Colors.dark.text }}
      />
      <Button title='Save' onPress={onSubmit} disabled={disabled} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
    padding: 20,
  },
});
