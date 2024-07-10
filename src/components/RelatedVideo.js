import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {last} from 'lodash';
import FastImage from 'react-native-fast-image';
import appStyles from 'themes/appStyles';
import Assets from 'assets/images';
import {useTheme} from 'themes/index';
import Text from 'components/Text';
import {Constants} from 'utils/constants';

const RelatedVideo = ({item, onPress}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(item.id);
      }}>
      <FastImage
        source={{uri: last(item?.thumbnails)?.url}}
        defaultSource={Assets.placeHolderImage}
        style={styles.img}
        resizeMode={'stretch'}
      />
      <View style={[styles.textView]}>
        <Text medium fontSize={appStyles.xs}>
          {item?.title}
        </Text>
        <Text fontSize={appStyles.xxs}>
          {`${item?.author?.name} • ${item?.published}`}
        </Text>
      </View>
      <View style={[styles.line, {backgroundColor: theme.colors.text}]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.row,
    ...appStyles.fullWidth,
    ...appStyles.hCenter,
    height: 60,
  },
  textView: {
    maxWidth: Constants.window.width - 80 - 30,
    height: 50,
    ...appStyles.mLXxs,
    ...appStyles.spaceEvenly,
  },
  img: {
    ...appStyles.mR,
    width: 80,
    height: 50,
  },
  line: {
    ...appStyles.fullWidth,
    position: 'absolute',
    height: 0.5,
    bottom: 0,
  },
  playlist: {
    position: 'absolute',
    right: 3,
    bottom: 3,
  },
});

export default RelatedVideo;
