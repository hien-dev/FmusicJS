import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Text from 'components/Text';
import appStyles from 'utils/appStyles';
import useTheme from 'hooks/useTheme';
import Image from './Image';

const RecentlyVideoHorizotal = props => {
  const {all, mini, onPress} = props;
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
          numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.h120}>
      <FlatList
        data={mini}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item?.videoId || index.toString()}
        renderItem={({item, index}) => itemView({item})}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
      {all.length > 3 && (
        <TouchableOpacity style={styles.seeAll}>
          <Text fontSize={appStyles.xxs} color={theme.primaryColors.cyanBlue}>
            See All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.mRXs,
    width: 120,
  },
  h120: {
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
  seeAll: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default RecentlyVideoHorizotal;
