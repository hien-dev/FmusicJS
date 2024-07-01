import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';

const AntDesign = ({name, size = 50, color, onPress}) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Icon2 name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export const MaterialIcons = ({name, size = 50, color, onPress}) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const VideoAction = ({
  paused,
  repeat,
  onPaused,
  onReplay,
  onForward,
  onRepeat,
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
        <MaterialIcons name={'replay-10'} color={color} onPress={onReplay} />
        <MaterialIcons
          name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
          size={100}
          color={color}
          onPress={onPaused}
        />
        <MaterialIcons name={'forward-10'} color={color} onPress={onForward} />
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
          color={false ? color : theme.primaryColors.xMediumGrey}
        />
      </View>
    </View>
  );
};

export default VideoAction;
