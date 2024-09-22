import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import { getWidth, PADDING } from '@/constants/Constants';
import { Colors } from '@/constants/Colors';

interface CustomButtonProps extends TouchableOpacityProps {
  label: string;
}

const width = getWidth();

const Button: React.FC<CustomButtonProps> = ({ label, style, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        {
          backgroundColor: props.disabled
            ? '#E0E0E0'
            : Colors.dark.primaryColor,
        },
        style,
      ]}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dark.tabIconSelected,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING,
    borderRadius: 20,
    width: '100%',
  },
});
