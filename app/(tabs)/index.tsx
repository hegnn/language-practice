import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  ViewStyle,
} from 'react-native';
import Card from '@/components/Card';
import { Colors } from '@/constants/Colors';

import { useSharedValue, withTiming } from 'react-native-reanimated';
import {
  getSafeAreaScreenHeight,
  getWidth,
  PADDING,
} from '@/constants/Constants';
import { useWordStore, WordCard } from '@/storage/storage';
import Button from '@/components/Button';

const width = getWidth();

export default function HomeScreen() {
  const [animating, setAnimating] = useState(false);
  const { getRandomWords, words: wordList } = useWordStore();
  const activeIndex = useSharedValue(0);
  const height = getSafeAreaScreenHeight();
  const [words, setWords] = useState<WordCard[]>([]);

  const duration = 1000;
  const absoluteButtonContainerStyle: ViewStyle = {
    position: 'absolute',
    top: height / 2 - PADDING,
    width: width - PADDING * 2,
    zIndex: 999,
    marginHorizontal: PADDING,
  };

  const startExercise = () => {
    try {
      const newWords = getRandomWords(10);
      if (newWords.length === 0) {
        Alert.alert('No words saved. Please add some words before proceeding.');
      } else setWords(newWords);
    } catch (err) {
      Alert.alert('Something went wrong, try again');
    }
  };
  const restartExercise = () => {
    setWords([]);
    activeIndex.value = 0;
    setAnimating(false);
  };
  const nextCard = () => {
    if (Math.floor(activeIndex.value) !== words.length && !animating) {
      setAnimating(true);
      activeIndex.value = withTiming(activeIndex.value + 1, {
        duration: duration,
      });
      setTimeout(() => setAnimating(false), duration);
    }
  };
  const previousCard = () => {
    if (Math.floor(activeIndex.value) !== 0 && !animating) {
      setAnimating(true);

      activeIndex.value = withTiming(activeIndex.value - 1, {
        duration: duration,
      });
      setTimeout(() => setAnimating(false), duration);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.view, { height: height }]}>
        {words.length !== 0 ? (
          <>
            <TouchableOpacity
              style={styles.leftHalfButton}
              onPress={previousCard}></TouchableOpacity>
            <TouchableOpacity
              style={styles.rightHalfButton}
              onPress={nextCard}></TouchableOpacity>

            {words.map((word, index) => (
              <View key={word.id} style={styles.cardContainer}>
                <Card
                  key={word.word}
                  data={word}
                  index={index}
                  activeIndex={activeIndex}
                />
              </View>
            ))}
            {words.length === activeIndex.value && !animating && (
              <View style={absoluteButtonContainerStyle}>
                <Button label='Restart' onPress={restartExercise} />
              </View>
            )}
          </>
        ) : (
          <View style={absoluteButtonContainerStyle}>
            <Button label='Start Exercise' onPress={startExercise} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.dark.background,
  },
  view: {
    zIndex: 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardContainer: {
    paddingHorizontal: PADDING,
    zIndex: 3,
  },

  leftHalfButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '50%',
    zIndex: 1,
  },
  rightHalfButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    zIndex: 1,
  },
});
