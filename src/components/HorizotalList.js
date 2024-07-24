import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Text from 'components/Text';
import Image from 'components/Image';
import appStyles from 'utils/appStyles';
import useTheme from 'hooks/useTheme';

const HorizotalList = props => {
  const {data, onPress} = props;
  const theme = useTheme();

  const itemView = useCallback(({item}) => {
    return (
      <TouchableOpacity
        key={item?.videoId}
        onPress={() => onPress(item)}
        style={styles.container}>
        <Image uri={item?.poster?.url} style={styles.img} />
        <Text
          fontSize={[appStyles.xxs, appStyles.mTXxs]}
          medium
          numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      data={data.slice(0, 5) ?? []}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item?.videoId || index.toString()}
      renderItem={({item, index}) => itemView({item})}
      ListFooterComponent={<View style={styles.listFooter} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.mRXs,
    width: 120,
    height: 120,
  },
  img: {
    width: '100%',
    height: 80,
  },
  listFooter: {
    width: 7,
    height: 80,
  },
});

export default HorizotalList;
