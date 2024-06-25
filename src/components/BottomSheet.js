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
import {Marquee} from '@animatereactnative/marquee';
import {useAppStore} from 'stores/appStore';
import ImageIcons from './ImageIcons';
import Assets from 'assets/images';
import VideoPlayer from './VideoPlayer';
import {useTheme} from 'themes/index';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

if (Constants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const StreamBotomSheet = () => {
  const {paddingTop} = useAppStore();
  const theme = useTheme();
  const {video, expandedVideo, setExpandedVideo, clearVideo} = useVideoPlayer();
  const rotateShareValue = useSharedValue(0);
  const sheetRef = useRef(null);
  const bottomInset = useMemo(() => {
    if (video === undefined) {
      return -100;
    }
    return Constants.android ? 49 : 79;
  }, [video]);

  useEffect(() => {
    if (sheetRef.current) {
      rotateShareValue.value = expandedVideo ? 0 : 180;
      expandedVideo ? sheetRef.current.expand() : sheetRef.current.collapse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const emptyView = () => (
    <View style={{backgroundColor: theme.colors.background}} />
  );

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotateShareValue.value}deg`}],
    };
  });
  const handleComponent = () => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setExpandedVideo(!expandedVideo)}
      style={[
        styles.handleComponent,
        {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
      ]}>
      <View
        style={[styles.iconLeft, {backgroundColor: theme.colors.background}]}>
        <ImageIcons
          source={Assets.arrowDown}
          color={theme.colors.icon}
          styles={rotateStyle}
        />
      </View>
      {expandedVideo ? (
        <Text
          fontSize={appStyles.xs}
          color={theme.colors.text}
          textAlign={'center'}
          bold>
          {'FMusic Mix'}
        </Text>
      ) : (
        <>
          <Marquee spacing={120} speed={1}>
            <Text color={theme.colors.text} fontSize={appStyles.xs} bold>
              {video?.videoDetail?.title}
            </Text>
          </Marquee>
          <Text
            color={theme.colors.border}
            fontSize={appStyles.xs}
            medium
            textAlign={'center'}
            containerStyle={styles.mT8}>
            {video?.author}
          </Text>
        </>
      )}
      {!expandedVideo && (
        <View
          style={[
            styles.iconRight,
            {backgroundColor: theme.colors.background},
          ]}>
          <ImageIcons
            source={Assets.cancel}
            color={theme.colors.icon}
            onPress={clearVideo}
          />
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
      enablePanDownToClose
      enableDynamicSizing={false}
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
  handleComponent: {
    ...appStyles.fullWidth,
    ...appStyles.vCenter,
    ...appStyles.pHSm,
    height: 70,
    shadowColor: '#D0D0D0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    borderTopWidth: 0.5,
    shadowRadius: 10,
    shadowOpacity: 5.0,
  },
  iconRight: {
    position: 'absolute',
    width: 38,
    top: 0,
    bottom: 0,
    right: 0,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  iconLeft: {
    position: 'absolute',
    width: 38,
    top: 0,
    bottom: 0,
    paddingLeft: 8,
    justifyContent: 'center',
    zIndex: 1,
  },
  mT8: {
    marginTop: 8,
  },
});

export default StreamBotomSheet;
