import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {AppConstants} from 'constants/AppConstants';

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
          <Text medium fontSize={appStyles.xs} color={theme.colors.text}>
            {parseTitle(item)}
          </Text>
          <Text
            fontSize={appStyles.xxs}
            color={theme.primaryColors.xMediumGrey}>
            {parseDescription(item)}
          </Text>
        </View>
        <View style={[styles.line, {backgroundColor: theme.colors.text}]} />
      </TouchableOpacity>
    );
  }
  return (
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
    maxWidth: AppConstants.window.width - 80 - 30,
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

export default ListRenderer;
