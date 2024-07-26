import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Text from 'components/Text';
import {MaterialIcons} from 'components/VectorIcons';
import useTheme from 'hooks/useTheme';
import appStyles from 'utils/appStyles';

const TextList = ({data, onPress}) => {
  const theme = useTheme();

  const _renderItem = ({item}) => (
    <TouchableOpacity key={item} onPress={() => onPress(item.text ?? item)}>
      <View
        style={[
          styles.h40,
          appStyles.row,
          appStyles.hCenter,
          appStyles.spaceBetween,
        ]}>
        <View style={[appStyles.row, appStyles.hCenter]}>
          <MaterialIcons
            name={item?.text ? 'history' : 'search'}
            size={25}
            color={theme.primaryColors.xMediumGrey}
          />
          <Text medium containerStyle={[appStyles.mLSm]}>
            {item?.text ?? item}
          </Text>
        </View>
        {item?.text && <MaterialIcons name={'close'} size={20} />}
      </View>
      <View style={[styles.line, {backgroundColor: theme.colors.text}]} />
    </TouchableOpacity>
  );

  return <FlatList data={data} renderItem={_renderItem} />;
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

export default TextList;
