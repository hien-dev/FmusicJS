import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

const ImageIcons = ({
  source,
  size = 24,
  color = '#000000',
  styles,
  onPress,
}) => (
  <TouchableOpacity disabled={!onPress} onPress={onPress}>
    <Image
      source={source}
      style={[{width: size, height: size, tintColor: color}, styles ?? styles]}
    />
  </TouchableOpacity>
);

export default ImageIcons;
