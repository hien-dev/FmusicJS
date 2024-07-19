import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import useTheme from 'hooks/useTheme';

export const MaterialIcons = ({name, size = 50, color, onPress, styles}) => {
  const theme = useTheme();
  const iconColor = theme.colors.icon;
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress} style={[styles]}>
      <Icon name={name} size={size} color={color ?? iconColor} />
    </TouchableOpacity>
  );
};

export const AntDesign = ({name, size = 50, color, onPress, styles}) => {
  const theme = useTheme();
  const iconColor = theme.colors.icon;
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress} style={[styles]}>
      <Icon2 name={name} size={size} color={color ?? iconColor} />
    </TouchableOpacity>
  );
};
