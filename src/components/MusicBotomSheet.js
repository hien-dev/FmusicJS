import React, {useEffect, useMemo, useRef} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Marquee} from '@animatereactnative/marquee';
import {MaterialIcons} from 'components/VectorIcons';
import VideoPlayer from 'components/VideoPlayer';
import MusicListBottomSheet from 'components/MusicListBottomSheet';
import Text from 'components/Text';
import {useVideoPlayer} from 'stores/videoStore';
import {useAppStore} from 'stores/appStore';
import {useTheme} from 'themes/index';
import appStyles from 'themes/appStyles';
import {Constants} from 'utils/constants';

if (Constants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MusicBotomSheet = () => {
  const {paddingTop} = useAppStore();
  const theme = useTheme();
  const {video, expandedVideo, setExpandedVideo, paused} = useVideoPlayer();

  const sheetRef = useRef(null);
  const musicListRef = useRef(null);
  const videoRef = useRef(null);

  const bottomInset = useMemo(() => {
    if (video === undefined) {
      return -100;
    }
    return Constants.android ? 49 : 79;
  }, [video]);

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

  const onResume = async () => {
    if (videoRef.current) {
      await videoRef.current.resume();
    }
  };

  const onPause = async () => {
    if (videoRef.current) {
      await videoRef.current.pause();
    }
  };

  const emptyView = () => (
    <View style={{backgroundColor: theme.colors.background}} />
  );

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
        <MaterialIcons
          name={expandedVideo ? 'arrow-circle-up' : 'arrow-circle-down'}
          size={24}
          color={theme.colors.icon}
        />
      </View>
      <>
        <Marquee spacing={120} speed={0.5}>
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
      {!expandedVideo && (
        <View
          style={[
            styles.iconRight,
            {backgroundColor: theme.colors.background},
          ]}>
          <MaterialIcons
            name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
            size={24}
            color={theme.colors.icon}
            onPress={async () => (paused ? await onResume() : await onPause())}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const footerComponent = () => (
    <View
      style={[
        styles.footerComponent,
        appStyles.row,
        appStyles.spaceEvenly,
        appStyles.pBSm,
        {backgroundColor: theme.colors.background},
      ]}>
      <MaterialIcons
        name={'playlist-add'}
        size={30}
        color={theme.colors.icon}
      />
      <MaterialIcons
        name={'playlist-play'}
        size={30}
        color={theme.colors.icon}
        onPress={() => {
          musicListRef.current.expand();
        }}
      />
      <MaterialIcons name={'ios-share'} size={24} color={theme.colors.icon} />
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      topInset={paddingTop}
      bottomInset={bottomInset}
      snapPoints={[70, '100%']}
      enableHandlePanningGesture={false}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      handleComponent={emptyView}
      footerComponent={emptyView}>
      <BottomSheetScrollView
        contentContainerStyle={[
          appStyles.full,
          {backgroundColor: theme.colors.background},
        ]}>
        {handleComponent()}
        <VideoPlayer ref={videoRef} />
        {footerComponent()}
        <MusicListBottomSheet ref={musicListRef} />
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
  footerComponent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  mT8: {
    marginTop: 8,
  },
});

export default MusicBotomSheet;
