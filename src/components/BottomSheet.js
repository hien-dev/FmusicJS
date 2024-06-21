import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {last} from 'lodash';
import {StyleSheet, LayoutAnimation, UIManager, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {AppConstants} from 'constants/AppConstants';
import {useTheme} from 'themes/index';
import {useVideoStore} from 'stores/videoStore';
import {
  parseRelatedVideos,
  parseStream,
  parseVideoDetails,
} from 'networkings/responses/StreamResponse';
import appStyles from 'themes/appStyles';
import VideoPlayer from './VideoPlayer';
import {FlashList} from '@shopify/flash-list';
import RelatedVideo from './RelatedVideo';
import {useNavigationStore} from 'stores/navigationStore';
import {SCREEN_NAME} from 'constants/ScreenNames';
import {useMutation} from '@tanstack/react-query';
import API from 'networkings/api';

if (AppConstants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const StreamBotomSheet = () => {
  const bottomSheetRef = useRef(null);
  const theme = useTheme();
  const {current} = useNavigationStore();
  const {video, expandedVideo, setVideo, setExpandedVideo} = useVideoStore();

  const mutationGetStream = useMutation({
    mutationFn: videoId => API.getStream(videoId),
    onSuccess: res => {
      setVideo(res);
    },
  });

  const videoDetail = useMemo(() => {
    return parseVideoDetails(video);
  }, [video]);

  const relatedVideos = useMemo(() => {
    return parseRelatedVideos(video);
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

  const bottomInset = useMemo(() => {
    if (video === undefined) {
      return -100;
    }
    if (current === SCREEN_NAME.SEARCH) {
      return AppConstants.android ? 10 : 0;
    }
    return AppConstants.android ? 49 : 79;
  }, [current, video]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={[90, AppConstants.android ? '100%' : '98%']}
      bottomInset={bottomInset}
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
            poster={last(videoDetail.thumbnails).url}
            expandedVideo={expandedVideo}
            cancel={() => setVideo(undefined)}
          />
        )}
        {relatedVideos && expandedVideo && (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={relatedVideos}
            estimatedItemSize={50}
            renderItem={({item, index}) => (
              <RelatedVideo
                item={item}
                index={index}
                onPress={value => {
                  mutationGetStream.mutate(value);
                }}
              />
            )}
            ListFooterComponent={<View style={styles.listFooter} />}
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
  listFooter: {
    ...appStyles.fullWidth,
    height: 130,
  },
});

export default StreamBotomSheet;
