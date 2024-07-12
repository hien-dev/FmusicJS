import React from 'react';
import {Animated} from 'react-native';
import {FontFamily} from 'themes/fonts';
import {useTheme} from 'themes/index';

/**
 *
 * @param {{
 *  children: string | JSX.Element | React.ReactNode | undefined,
 *  bold: boolean,
 *  medium: boolean,
 *  fontSize: number,
 *  color: string,
 *  textAlign: auto | left | right | center | justify | undefined,
 *  numberOfLines: number,
 *  containerStyle: ViewStyle | object
 * }} props
 * @returns
 */
const Text = props => {
  const {
    children,
    bold,
    medium,
    fontSize = {fontSize: 13},
    color,
    numberOfLines = 2,
    textAlign = 'auto',
    containerStyle,
  } = props;

  const textColor = useTheme().colors.text;

  const getFont = () => {
    if (bold) {
      return FontFamily.bold;
    }
    if (medium) {
      return FontFamily.medium;
    }
    return FontFamily.regular;
  };

  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: getFont(),
          color: color ?? textColor,
          textAlign: textAlign,
        },
        fontSize,
        containerStyle,
      ]}>
      {children}
    </Animated.Text>
  );
};

export default Text;
