import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useData } from '@/context/DataProvider';
import Card from '@/components/Card';
import { Colors } from '@/constants/Colors';

import { useState } from 'react';
import { Button } from '@rneui/base';

export default function HomeScreen() {
  const { words } = useData();
  const [count, setCount] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {words.length !== 0 ? (
          <Card data={words[count]} />
        ) : (
          <Text style={{ color: Colors.dark.text }}>No Words</Text>
        )}
      </View>

      <Button
        title='Back'
        onPress={() => setCount(count - 1)}
        disabled={count === 0}
      />
      <Button
        title='Next'
        onPress={() => setCount(count + 1)}
        disabled={words.length - 1 === count || words.length === 0}
      />
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
