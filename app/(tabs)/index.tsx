import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useData } from '@/context/DataProvider';
import Card from '@/components/Card';
import { Colors } from '@/constants/Colors';

import { useSharedValue, withTiming } from 'react-native-reanimated';
import { getSafeAreaScreenHeight, PADDING } from '@/constants/Constants';

export default function HomeScreen() {
  const [animating, setAnimating] = useState(false);
  const { words } = useData();
  const activeIndex = useSharedValue(0);
  const duration = 1000;
  const height = getSafeAreaScreenHeight();

  const next = () => {
    if (Math.floor(activeIndex.value) !== words.length && !animating) {
      setAnimating(true);
      activeIndex.value = withTiming(activeIndex.value + 1, {
        duration: duration,
      });
      setTimeout(() => setAnimating(false), duration);
    }
  };
  const back = () => {
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
        <TouchableOpacity
          style={styles.leftHalfButton}
          onPress={back}></TouchableOpacity>
        <TouchableOpacity
          style={styles.rightHalfButton}
          onPress={next}></TouchableOpacity>

        {words.map((word, index) => (
          <View style={styles.cardContainer}>
            <Card
              key={word.word}
              data={word}
              index={index}
              activeIndex={activeIndex}
            />
          </View>
        ))}
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
