import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const PADDING = 20;

export const CARD_WIDTH = SCREEN_WIDTH - PADDING * 2;
export const ASPECT_RATIO = 1.5;
export const CARD_HEIGHT = CARD_WIDTH / ASPECT_RATIO;

export const getSafeAreaScreenHeight = () => {
  const topInset = useSafeAreaInsets().top;
  return SCREEN_HEIGHT - topInset - 79; // 79 is bottom navigation height;
};
