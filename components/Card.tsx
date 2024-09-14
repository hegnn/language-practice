import { Colors } from '@/constants/Colors';
import { WordCard } from '@/context/DataProvider';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const FlipCard = ({ data }: { data: WordCard }) => {
  const isFlipped = useSharedValue(false);
  const [show, setShow] = useState(true);
  const duration = 1000;

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [{ perspective: 600 }, { rotateY: rotateValue }],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [{ perspective: 600 }, { rotateY: rotateValue }],
    };
  });

  useEffect(() => {
    setShow(false);
    setTimeout(() => setShow(true), duration);
    isFlipped.value = false;
  }, [data]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.regularCard,
          styles.cardContainer,
          regularCardAnimatedStyle,
        ]}>
        <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit>
          {data.word}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.flippedCard,
          styles.cardContainer,
          flippedCardAnimatedStyle,
        ]}>
        {show && (
          <>
            <Text style={styles.artikel}>{data.artikel}</Text>
            <Text style={styles.meaning}>{data.meaning}</Text>
            <Text style={styles.sentence}>{data.sentence}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default FlipCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 40,
    padding: 20,
  },
  regularCard: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#ccdbfd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flippedCard: {
    aspectRatio: 1.5,
    backfaceVisibility: 'hidden',
    zIndex: 2,
    backgroundColor: '#ccdbfd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  meaning: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  artikel: {
    fontSize: 20,
    color: Colors.light.text,
  },
  sentence: {
    fontSize: 20,
    color: Colors.light.text,
  },
});
