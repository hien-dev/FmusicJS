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
import useTheme from 'hooks/useTheme';
import useSafeArea from 'hooks/useSafeAreaInsets';
import {useVideoState} from 'hooks/useVideoPlayer';
import appStyles from 'utils/appStyles';
import Constants from 'utils/constants';

if (Constants.android && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MusicBotomSheet = () => {
  const {insets} = useSafeArea();
  const theme = useTheme();
  const {paused, title, author, source, expanded, setExpanded} =
    useVideoState();

  const sheetRef = useRef(null);
  const musicListRef = useRef(null);
  const videoRef = useRef(null);

  const bottomInset = useMemo(() => {
    if (source === undefined) {
      return -100;
    }
    return Constants.android ? 49 : 79;
  }, [source]);

  useEffect(() => {
    if (sheetRef.current) {
      expanded ? sheetRef.current.expand() : sheetRef.current.collapse();
    }
  }, [expanded]);

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
    setExpanded(index !== 0);
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
      onPress={() => setExpanded(!expanded)}
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
          name={expanded ? 'arrow-circle-down' : 'arrow-circle-up'}
          size={24}
        />
      </View>
      <>
        <Marquee spacing={120} speed={0.5}>
          <Text fontSize={appStyles.xs} bold>
            {title}
          </Text>
        </Marquee>
        <Text
          color={theme.colors.border}
          fontSize={appStyles.xs}
          medium
          textAlign={'center'}
          containerStyle={styles.mT8}>
          {author}
        </Text>
      </>
      {!expanded && (
        <View
          style={[
            styles.iconRight,
            {backgroundColor: theme.colors.background},
          ]}>
          <MaterialIcons
            name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
            size={24}
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
        name={'playlist-play'}
        size={30}
        onPress={() => {
          musicListRef.current.expand();
        }}
      />
      <MaterialIcons
        name={'podcasts'}
        size={30}
        color={theme.primaryColors.xMediumGrey}
      />
      <MaterialIcons
        name={'ios-share'}
        size={24}
        color={theme.primaryColors.xMediumGrey}
      />
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      topInset={Constants.android ? 0 : insets?.top ?? 0}
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
