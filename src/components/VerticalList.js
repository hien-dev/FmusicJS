import useTheme from 'hooks/useTheme';
import React, {forwardRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import appStyles from 'utils/appStyles';
import Text from 'components/Text';
import Image from 'components/Image';
import {MaterialIcons} from 'components/VectorIcons';
import Constants from 'utils/constants';

const VerticalList = forwardRef((props, ref) => {
  const {data, loading, onEndReached, onPress, contentContainerStyle} = props;
  const theme = useTheme();

  const messageView = text => (
    <View style={styles.messageText}>
      <Text medium fontSize={appStyles.xs} color={theme.colors.border}>
        {text}
      </Text>
    </View>
  );

  const placeholderView = () => (
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

  const renderSong = item => {
    if (item && (item?.playlistId || item?.videoId)) {
      return (
        <TouchableOpacity style={styles.song} onPress={() => onPress(item)}>
          <View>
            <Image uri={item?.thumbnail} style={styles.img} />
            {item?.playlistId && (
              <MaterialIcons
                name={'playlist-play'}
                size={24}
                color={theme.primaryColors.gray76}
                styles={styles.playlist}
              />
            )}
          </View>
          <View style={[styles.textView]}>
            <Text medium fontSize={appStyles.xs}>
              {item?.title}
            </Text>
            <Text
              fontSize={appStyles.xxs}
              color={theme.primaryColors.xMediumGrey}>
              {item?.description}
            </Text>
          </View>
          <View style={[styles.line, {backgroundColor: theme.colors.text}]} />
        </TouchableOpacity>
      );
    }
  };

  const _renderItem = ({item}) => {
    if (item?.message) {
      return messageView(item?.message.text);
    }

    if (item !== undefined && item !== null) {
      return renderSong(item);
    }

    return placeholderView();
  };

  return (
    <FlatList
      ref={ref}
      data={data}
      estimatedItemSize={30}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      renderItem={_renderItem}
      contentContainerStyle={contentContainerStyle}
      ListFooterComponent={
        <View style={styles.listFooter}>
          {loading && (
            <ActivityIndicator size={'large'} color={theme.colors.icon} />
          )}
        </View>
      }
    />
  );
});

const styles = StyleSheet.create({
  messageText: {
    ...appStyles.hCenter,
    ...appStyles.vCenter,
    height: 60,
    paddingBottom: 10,
  },
  song: {
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
    right: 0,
    bottom: 0,
  },
  listFooter: {
    ...appStyles.fullWidth,
    ...appStyles.pTSm,
    height: 100,
  },
});

export default VerticalList;
