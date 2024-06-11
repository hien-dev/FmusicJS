import React from 'react';
import {Image} from 'react-native';

const ImageIcons = ({source, size = 25, color = '#000000'}) => (
  <Image
    source={source}
    style={{width: size, height: size, tintColor: color}}
  />
);

export default ImageIcons;
