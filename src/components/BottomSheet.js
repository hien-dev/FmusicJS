import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {last} from 'lodash';
import {StyleSheet, LayoutAnimation, UIManager, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {AppConstants} from 'constants/AppConstants';
import {useThemeForScheme} from 'themes/index';
import {useVideoStore} from 'stores/videoStore';
import {
  parseStream,
  parseVideoDetails,
} from 'networkings/responses/StreamResponse';
import Video from 'react-native-video';
import appStyles from 'themes/appStyles';
import VideoPlayer from './VideoPlayer';

if (AppConstants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const StreamBotomSheet = () => {
  const bottomSheetRef = useRef(null);
  const theme = useThemeForScheme();
  const {video, canPlaying, expandedVideo, setExpandedVideo} = useVideoStore();

  const videoDetail = useMemo(() => {
    return parseVideoDetails(video);
  }, [video]);

  const sourceVideo = useMemo(() => {
    if (video && videoDetail) {
      let uri = parseStream(video)?.url;
      const source = {
        uri: uri,
        metadata: {
          title: videoDetail.title,
          imageUri: last(videoDetail.thumbnails)?.url,
        },
      };
      return source;
    }
    return undefined;
  }, [video, videoDetail]);

  useEffect(() => {
    if (bottomSheetRef.current) {
      expandedVideo
        ? bottomSheetRef.current.expand()
        : bottomSheetRef.current.collapse();
    }
  }, [expandedVideo]);

  const handleSheetChanges = index => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 1,
      },
    });
    setExpandedVideo(index !== 0);
  };

  const bottomInset = () => {
    if (video === undefined) {
      return -100;
    }
    // if (viewModel.routeName === 'AlbumScreens') {
    //     return Utils.isAndroid ? 10 : 15
    // }
    return AppConstants.android ? 49 : 79;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={[90, AppConstants.android ? '100%' : '95%']}
      bottomInset={bottomInset()}
      handleStyle={[
        styles.handleStyle,
        {backgroundColor: theme.colors.background},
      ]}
      handleIndicatorStyle={[
        styles.size,
        {backgroundColor: theme.colors.border},
      ]}>
      <BottomSheetView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        {video && (
          <VideoPlayer
            videoDetail={videoDetail}
            sourceVideo={sourceVideo}
            expandedVideo={expandedVideo}
            canPlaying={canPlaying}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    width: AppConstants.window.width,
    height: AppConstants.window.height,
    ...appStyles.pHSm,
  },
  size: {
    width: 50,
  },
  handleStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default StreamBotomSheet;
