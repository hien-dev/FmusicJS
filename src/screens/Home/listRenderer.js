import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import {
  parseDescription,
  parseThumbnail,
  parseTitle,
  parseVideoID,
  playlistRenderer,
  videoRenderer,
} from 'networkings/responses/SearchResponse';
import appStyles from 'themes/appStyles';
import Assets from 'assets/images';
import {useTheme} from 'themes/index';
import Text from 'components/Text';
import ImageIcons from 'components/ImageIcons';

/**
 * @param {{playlistRenderer} | {videoRenderer}} item
 */
const ListRenderer = ({item, index, onPress}) => {
  const theme = useTheme();

  if (item && (item.playlistRenderer || item.videoRenderer)) {
    return (
      <TouchableOpacity
        key={item.playlistRenderer?.playlistId || item.videoRenderer?.videoId}
        style={styles.container}
        onPress={() => {
          onPress(parseVideoID(item));
        }}>
        <View>
          <FastImage
            source={{uri: parseThumbnail(item)}}
            defaultSource={Assets.placeHolderImage}
            style={styles.img}
            resizeMode={'stretch'}
          />
          {item.playlistRenderer && (
            <ImageIcons
              source={Assets.playlist}
              size={15}
              color={theme.primaryColors.gray76}
              styles={styles.playlist}
            />
          )}
        </View>
        <View style={[styles.textView]}>
          <Text medium color={theme.colors.text}>
            {parseTitle(item)}
          </Text>
          <Text fontSize={appStyles.xxs} color={theme.colors.text}>
            {parseDescription(item)}
          </Text>
        </View>
        <View style={[styles.line, {backgroundColor: theme.colors.text}]} />
      </TouchableOpacity>
    );
  }
  return (
    <View key={index} style={styles.recommenddationItem}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={appStyles.fullWidth.width}
          height={65}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={60}
            borderRadius={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
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
    maxWidth: Dimensions.get('window').width - 100 - 30,
    height: 50,
    ...appStyles.mLXxs,
    ...appStyles.spaceEvenly,
  },
  img: {
    ...appStyles.mR,
    width: 100,
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

export default ListRenderer;
