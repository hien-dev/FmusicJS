import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {last} from 'lodash';
import appStyles from 'utils/appStyles';
import useTheme from 'hooks/useTheme';
import Text from 'components/Text';
import {Constants} from 'utils/constants';
import Image from './Image';

const RelatedVideo = ({item, onPress}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(item.id);
      }}>
      <Image uri={last(item?.thumbnails)?.url} style={styles.img} />
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
