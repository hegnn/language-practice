import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  getSafeAreaScreenHeight,
} from '@/constants/Constants';
import { WordCard } from '@/storage/storage';

const Card = ({
  data,
  index,
  activeIndex,
}: {
  data: WordCard;
  index: number;
  activeIndex: SharedValue<number>;
}) => {
  const showBackSide = useSharedValue(false);
  const duration = 1000;

  const height = getSafeAreaScreenHeight();

  const handlePress = () => {
    if (index === Math.floor(activeIndex.value))
      showBackSide.value = !showBackSide.value;
  };

  const rCardStyle = useAnimatedStyle(() => {
    const topPosition = -height - CARD_HEIGHT / (3 / 2);
    const centerPosition = -height / 2 - CARD_HEIGHT / 2;
    const bottomPosition = -CARD_HEIGHT / 3;

    const top = interpolate(
      activeIndex.value,
      [index - 2, index - 1, index, index + 1, index + 2],
      [
        bottomPosition + 20,
        bottomPosition,
        centerPosition,
        topPosition,
        topPosition - 20,
      ],
      Extrapolation.CLAMP
    );

    return {
      top: top,
    };
  });

  const rFrontCardStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(showBackSide.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [{ perspective: 600 }, { rotateY: rotateValue }],
    };
  });

  const rBackCardStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(
      Number(showBackSide.value),
      [0, 1],
      [180, 360]
    );
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [{ perspective: 600 }, { rotateY: rotateValue }],
    };
  });

  useAnimatedReaction(
    () => {
      return activeIndex.value;
    },
    (result, previous) => {
      if (result !== previous) {
        showBackSide.value = false;
      }
    },
    []
  );

  return (
    <Animated.View
      style={[
        {
          zIndex: 3,
        },
        rCardStyle,
      ]}>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[styles.frontCard, styles.cardContainer, rFrontCardStyle]}>
          <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit>
            {data.word}
          </Text>
        </Animated.View>
        <Animated.View
          style={[styles.backCard, styles.cardContainer, rBackCardStyle]}>
          <Text style={styles.artikel}>{data.artikel}</Text>
          <Text style={styles.meaning}>{data.meaning}</Text>
          <Text style={styles.sentence}>{data.sentence}</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    position: 'absolute',
  },
  frontCard: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.dark.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backCard: {
    aspectRatio: 1.5,
    backfaceVisibility: 'hidden',
    zIndex: 2,
    backgroundColor: Colors.dark.primaryColor,
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
