import React, {useEffect, useMemo, useRef} from 'react';
import {StyleSheet, LayoutAnimation, UIManager, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useMutation} from '@tanstack/react-query';
import {FlashList} from '@shopify/flash-list';
import VideoPlayer from 'components/VideoPlayer';
import RelatedVideo from 'components/RelatedVideo';
import {useVideoPlayer} from 'stores/videoStore';
import {useNavigationStore} from 'stores/navigationStore';
import API from 'networkings/api';
import {useTheme} from 'themes/index';
import appStyles from 'themes/appStyles';
import {Constants, SCREEN_NAME} from 'utils/constants';
import {useLoading} from 'stores/appStore';

if (Constants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const StreamBotomSheet = () => {
  const bottomSheetRef = useRef(null);
  const theme = useTheme();
  const {current} = useNavigationStore();
  const {video, expandedVideo, setVideo, setExpandedVideo, clearVideo} =
    useVideoPlayer();
  const {show, hide} = useLoading();

  const mutationGetStream = useMutation({
    mutationFn: videoId => {
      show();
      return API.getStream(videoId);
    },
    onSuccess: res => {
      hide();
      setVideo(res);
    },
    onError: err => {
      hide();
      console.log('error', err);
    },
  });

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
    if (current === SCREEN_NAME.SEARCH || current === SCREEN_NAME.ALBUMS) {
      return Constants.android ? 10 : 0;
    }
    return Constants.android ? 49 : 79;
  }, [current, video]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={[90, Constants.android ? '100%' : '98%']}
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
            videoDetail={video.videoDetail}
            sourceVideo={video.sourceVideo}
            poster={video.poster}
            expandedVideo={expandedVideo}
            cancel={() => clearVideo(undefined)}
          />
        )}
        {video?.relatedVideos && expandedVideo && (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={video.relatedVideos}
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
    width: Constants.window.width,
    height: Constants.window.height,
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
