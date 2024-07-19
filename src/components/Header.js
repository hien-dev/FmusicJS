import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/Text';
import {MaterialIcons} from 'components/VectorIcons';
import appStyles from 'utils/appStyles';

const Header = ({title, iconName, onPress}) => {
  return (
    <View
      style={[
        styles.h50,
        appStyles.row,
        appStyles.spaceBetween,
        appStyles.hCenter,
      ]}>
      <Text bold fontSize={appStyles.md}>
        {title}
      </Text>
      {iconName && onPress && (
        <MaterialIcons name={iconName} size={25} onPress={onPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  h50: {
    height: 50,
  },
});

export default Header;
