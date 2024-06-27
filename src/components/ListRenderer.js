import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {parseSearch} from 'networkings/responses/SearchResponse';
import appStyles from 'themes/appStyles';
import Assets from 'assets/images';
import {useTheme} from 'themes/index';
import Text from 'components/Text';
import ImageIcons from 'components/ImageIcons';
import {Constants} from 'utils/constants';
import {parseAlbum} from 'networkings/responses/AlbumsResponse';

const ListRenderer = memo(props => {
  const {item, onPress, isHome = true} = props;
  const theme = useTheme();
  let data = isHome ? parseSearch(item) : parseAlbum(item);
  if (data.message) {
    return (
      <View style={styles.messageText}>
        <Text medium fontSize={appStyles.xs} color={theme.colors.border}>
          {data?.message.text}
        </Text>
      </View>
    );
  }
  if (data && (data?.playlistId || data?.videoId)) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          onPress(data);
        }}>
        <View>
          <Image
            source={{uri: data?.thumbnail}}
            defaultSource={Assets.placeHolderImage}
            style={styles.img}
            resizeMode={'stretch'}
          />
          {data?.playlistId && (
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
            {data?.title}
          </Text>
          <Text
            fontSize={appStyles.xxs}
            color={theme.primaryColors.xMediumGrey}>
            {data?.description}
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
});

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
  messageText: {
    ...appStyles.hCenter,
    ...appStyles.vCenter,
    height: 60,
    paddingBottom: 10,
  },
});

export default ListRenderer;
