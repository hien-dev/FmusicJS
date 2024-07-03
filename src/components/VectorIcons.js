import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

export const MaterialIcons = ({name, size = 50, color, onPress, styles}) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress} style={[styles]}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export const AntDesign = ({name, size = 50, color, onPress, styles}) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress} style={[styles]}>
      <Icon2 name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
