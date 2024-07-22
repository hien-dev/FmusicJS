import React from 'react';
import {Animated} from 'react-native';
import Assets from 'assets/images';
import useAppScript from 'hooks/useAppScript';

const Image = ({uri, style}) => {
  const {appScript} = useAppScript();
  return (
    <Animated.Image
      source={appScript?.showPoster ? Assets.placeHolderImage : {uri: uri}}
      defaultSource={Assets.placeHolderImage}
      style={style}
      resizeMode={'cover'}
    />
  );
};

export default Image;
