import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Text from 'components/Text';
import LoadingView from 'components/LoadingView';
import VerticalList from 'components/VerticalList';
import {MaterialIcons} from 'components/VectorIcons';
import useTheme from 'hooks/useTheme';
import useVideoPlayer, {useVideoState} from 'hooks/useVideoPlayer';
import appStyles from 'utils/appStyles';

const MusicListBottomSheet = React.forwardRef(({}, ref) => {
  const theme = useTheme();
  const {getVideo} = useVideoPlayer();
  const {relatedVideos, albums} = useVideoState();

  const playlist = useMemo(() => {
    return albums || relatedVideos;
  }, [relatedVideos, albums]);

  const [showPlaylist, setShowPlaylist] = useState(false);

  const emptyView = () => (
    <View style={{backgroundColor: theme.colors.background}} />
  );

  const handleSheetChanges = index => {
    if (index === 1) {
      setShowPlaylist(true);
    }
  };

  const handleComponent = () => (
    <TouchableOpacity
      onPress={onClose}
      style={[
        styles.handleComponent,
        {
          backgroundColor: theme.primaryColors.background,
          borderColor: theme.colors.border,
        },
      ]}>
      <MaterialIcons name={'arrow-circle-down'} size={24} />
      <Text fontSize={appStyles.sm} bold>
        PLAY LIST
      </Text>
      <View style={styles.size24} />
    </TouchableOpacity>
  );

  const onClose = () => {
    setShowPlaylist(false);
    ref.current.close();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[1, '100%']}
      bottomInset={-10}
      enableHandlePanningGesture={false}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      handleComponent={emptyView}
      footerComponent={emptyView}>
      <BottomSheetScrollView
        style={appStyles.flex}
        contentContainerStyle={[
          appStyles.full,
          {backgroundColor: theme.colors.background},
        ]}>
        {handleComponent()}
        {showPlaylist ? (
          <VerticalList
            data={playlist}
            onPress={async value => {
              await getVideo(value.videoId, albums);
              onClose();
            }}
            contentContainerStyle={appStyles.pHXs}
          />
        ) : (
          <LoadingView />
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  handleComponent: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    ...appStyles.pHXs,
    ...appStyles.row,
    ...appStyles.spaceBetween,
    ...appStyles.hCenter,
  },
  size24: {
    width: 24,
    height: 24,
  },
});

export default MusicListBottomSheet;
