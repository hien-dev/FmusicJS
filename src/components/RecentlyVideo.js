import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from 'components/Text';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import Assets from 'assets/images';

const RecentlyVideo = memo(props => {
  const {item, onPress} = props;
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <Image
        key={item?.videoId}
        source={{uri: item?.thumbnail}}
        defaultSource={Assets.placeHolderImage}
        style={styles.img}
        resizeMode={'stretch'}
      />
      <Text
        fontSize={[appStyles.xxs, appStyles.mTXxs]}
        medium
        numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    ...appStyles.mRXs,
    width: 120,
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

export default RecentlyVideo;
