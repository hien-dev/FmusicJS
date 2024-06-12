import React from 'react';
import {Image} from 'react-native';

const ImageIcons = ({source, size = 25, color = '#000000', styles}) => (
  <Image
    source={source}
    style={[{width: size, height: size, tintColor: color}, styles ?? styles]}
  />
);

export default ImageIcons;
