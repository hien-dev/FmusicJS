import React, {useEffect, useMemo, useRef} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Text from 'components/Text';
import appStyles from 'themes/appStyles';
import {Constants, SCREEN_NAME} from 'utils/constants';
import {useVideoPlayer} from 'stores/videoStore';
import {useNavigationStore} from 'stores/navigationStore';
import {Marquee} from '@animatereactnative/marquee';
import {useAppStore} from 'stores/appStore';
import ImageIcons from './ImageIcons';
import Assets from 'assets/images';
import VideoPlayer from './VideoPlayer';
import {useTheme} from 'themes/index';

if (Constants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const StreamBotomSheet = () => {
  const {paddingTop} = useAppStore();
  const theme = useTheme();
  const {current} = useNavigationStore();
  const {video, expandedVideo, setExpandedVideo, clearVideo} = useVideoPlayer();

  const sheetRef = useRef(null);
  const bottomInset = useMemo(() => {
    if (video === undefined) {
      return -100;
    }
    if (current === SCREEN_NAME.SEARCH || current === SCREEN_NAME.ALBUMS) {
      return Constants.android ? 10 : 0;
    }
    return Constants.android ? 49 : 79;
  }, [current, video]);

  useEffect(() => {
    if (sheetRef.current) {
      expandedVideo ? sheetRef.current.expand() : sheetRef.current.collapse();
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

  const emptyView = () => <View style={styles.emptyView} />;

  const handleComponent = () => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setExpandedVideo(!expandedVideo)}
      style={[
        styles.handleComponent,
        {backgroundColor: theme.colors.background},
      ]}>
      <View style={styles.iconLeft}>
        <ImageIcons source={Assets.arrowDown} />
      </View>
      {expandedVideo ? (
        <Text fontSize={appStyles.sm} textAlign={'center'} bold>
          {'FMusic Mix'}
        </Text>
      ) : (
        <Marquee spacing={120} speed={1}>
          <Text fontSize={appStyles.sm} bold>
            {video?.videoDetail?.title}
          </Text>
        </Marquee>
      )}
      {!expandedVideo && (
        <View style={styles.iconRight}>
          <ImageIcons source={Assets.cancel} onPress={clearVideo} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      topInset={paddingTop}
      bottomInset={bottomInset}
      snapPoints={[70, '100%']}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      onChange={handleSheetChanges}
      handleComponent={emptyView}>
      <BottomSheetScrollView
        contentContainerStyle={[{backgroundColor: theme.colors.background}]}>
        {handleComponent()}
        {video && (
          <VideoPlayer
            sourceVideo={video.sourceVideo}
            expandedVideo={expandedVideo}
            poster={video.poster}
          />
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#FFF',
  },
  emptyView: {
    backgroundColor: '#FFF',
  },
  handleComponent: {
    ...appStyles.fullWidth,
    ...appStyles.vCenter,
    ...appStyles.pHSm,
    height: 70,
    shadowColor: '#D0D0D0',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  iconRight: {
    position: 'absolute',
    width: 38,
    height: 70,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  iconLeft: {
    position: 'absolute',
    width: 38,
    height: 70,
    top: 0,
    bottom: 0,
    paddingLeft: 14,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    zIndex: 1,
  },
});

export default StreamBotomSheet;
