import React from 'react';
import {View} from 'react-native';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import {MaterialIcons, AntDesign} from 'components/VectorIcons';

const VideoAction = ({
  paused,
  repeat,
  isFavourite,
  onPaused,
  onReplay,
  onForward,
  onRepeat,
  onFavourite,
}) => {
  const theme = useTheme();
  const color = theme.colors.icon;
  return (
    <View style={[appStyles.pHSm]}>
      <View
        style={[
          appStyles.row,
          appStyles.spaceBetween,
          appStyles.hCenter,
          appStyles.mVSm,
        ]}>
        <MaterialIcons name={'replay-10'} onPress={onReplay} />
        <MaterialIcons
          name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
          size={100}
          onPress={onPaused}
        />
        <MaterialIcons name={'forward-10'} onPress={onForward} />
      </View>
      <View
        style={[
          appStyles.row,
          appStyles.spaceEvenly,
          appStyles.hCenter,
          appStyles.mVSm,
        ]}>
        <MaterialIcons
          name={'repeat-one'}
          size={40}
          color={repeat ? color : theme.primaryColors.xMediumGrey}
          onPress={onRepeat}
        />
        <AntDesign
          name={'heart'}
          size={40}
          color={isFavourite ? color : theme.primaryColors.xMediumGrey}
          onPress={onFavourite}
        />
      </View>
    </View>
  );
};

export default VideoAction;
