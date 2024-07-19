import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from 'components/VectorIcons';
import appStyles from 'utils/appStyles';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

const ListSearchText = ({item, onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity key={item} onPress={onPress}>
      <View
        style={[
          styles.h40,
          appStyles.row,
          appStyles.hCenter,
          appStyles.spaceBetween,
        ]}>
        <View style={[appStyles.row, appStyles.hCenter]}>
          <MaterialIcons
            name={'history'}
            size={25}
            color={theme.primaryColors.xMediumGrey}
          />
          <Text medium containerStyle={[appStyles.mLSm]}>
            {item.text}
          </Text>
        </View>
        <MaterialIcons name={'close'} size={20} />
      </View>
      <View style={[styles.line, {backgroundColor: theme.colors.text}]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  h40: {
    height: 40,
  },
  line: {
    ...appStyles.fullWidth,
    position: 'absolute',
    height: 0.5,
    bottom: 0,
  },
});

export default ListSearchText;
