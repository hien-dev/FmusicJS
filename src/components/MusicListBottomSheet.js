import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import Text from 'components/Text';
import RelatedVideo from 'components/RelatedVideo';
import {useVideoPlayer} from 'stores/videoStore';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import {useMutation} from '@tanstack/react-query';
import API from 'networkings/api';
import {useAppStore} from 'stores/appStore';
import {MaterialIcons} from './VideoPlayer/videoAction';
import {usePlaylist} from 'stores/playListStore';
import ListRenderer from './ListRenderer';
import LoadingView from './LoadingView';

const MusicListBottomSheet = React.forwardRef(({}, ref) => {
  const theme = useTheme();
  const {setVideo} = useVideoPlayer();
  const {playlist, isAlbum} = usePlaylist();
  const {show, hide} = useAppStore();
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
      <MaterialIcons
        name={'arrow-circle-down'}
        size={24}
        color={theme.colors.icon}
      />
      <Text fontSize={appStyles.sm} color={theme.colors.text} bold>
        PLAY LIST
      </Text>
      <View style={styles.size24} />
    </TouchableOpacity>
  );

  const onClose = () => {
    setShowPlaylist(false);
    ref.current.close();
  };

  const mutationGetStream = useMutation({
    mutationFn: videoId => {
      show();
      return API.getStream(videoId);
    },
    onSuccess: res => {
      hide();
      onClose();
      var video = res;
      video.isAlbum = isAlbum;
      setVideo(res);
    },
    onError: err => {
      hide();
      console.log('error', err);
    },
  });

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
          <FlatList
            contentContainerStyle={appStyles.pHXs}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item?.id || item?.videoId || index.toString()
            }
            data={playlist ?? []}
            renderItem={({item, index}) => {
              if (isAlbum) {
                return (
                  <ListRenderer
                    key={item.videoId}
                    isAlbum={isAlbum}
                    item={item}
                    onPress={value => {
                      mutationGetStream.mutate(value.videoId);
                    }}
                  />
                );
              }
              return (
                <RelatedVideo
                  key={item.id}
                  item={item}
                  onPress={value => {
                    mutationGetStream.mutate(value);
                  }}
                />
              );
            }}
            ListFooterComponent={<View style={styles.listFooter} />}
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
  listFooter: {
    ...appStyles.fullWidth,
    height: 80,
  },
  size24: {
    width: 24,
    height: 24,
  },
});

export default MusicListBottomSheet;
