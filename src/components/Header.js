import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/Text';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import {MaterialIcons} from 'components/VectorIcons';

const Header = ({title, iconName, onPress}) => {
  const theme = useTheme();
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
        <MaterialIcons
          name={iconName}
          size={25}
          color={theme.colors.icon}
          onPress={onPress}
        />
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
