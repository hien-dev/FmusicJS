import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {isEmpty} from 'lodash';
import TextList from 'components/TextList';
import VerticalList from 'components/VerticalList';
import {MaterialIcons} from 'components/VectorIcons';
import useTheme from 'hooks/useTheme';
import useSearch from 'hooks/useSearch';
import useVideoPlayer from 'hooks/useVideoPlayer';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useNavigationState from 'hooks/useNavigationState';
import Constants, {SCREEN_NAME} from 'utils/constants';
import appStyles from 'utils/appStyles';

const Search = () => {
  const ref = useRef(null);
  const theme = useTheme();
  const {videos, listSearch, onFetch, onNext} = useSearch();
  const {paddingTop} = useSafeArea();
  const {getVideo} = useVideoPlayer();
  const {goBack, navigate} = useNavigationState();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={[appStyles.flex, appStyles.pHSm, paddingTop()]}>
      <View style={[styles.topView, {borderColor: theme.colors.border}]}>
        <MaterialIcons
          name={'arrow-back-ios-new'}
          size={24}
          onPress={() => goBack()}
        />
        <View style={styles.inputView}>
          <TextInput
            value={searchText}
            placeholder="Search"
            placeholderTextColor={theme.primaryColors.gray76}
            onChangeText={value => setSearchText(value)}
            returnKeyType="search"
            onSubmitEditing={async () => {
              if (!isEmpty(searchText)) {
                await onFetch(searchText);
              }
            }}
            style={[
              appStyles.full,
              appStyles.pHSm,
              styles.radius,
              {backgroundColor: theme.primaryColors.midLightGrey},
            ]}
          />
        </View>
      </View>
      {!isEmpty(videos) ? (
        <VerticalList
          ref={ref}
          data={videos}
          loading={true}
          onEndReached={onNext}
          onPress={async value => {
            if (value?.playlistId) {
              navigate(SCREEN_NAME.ALBUMS, {
                videoId: value?.videoId,
                playlistId: value?.playlistId,
                title: value?.title,
              });
              return;
            }
            await getVideo(value.videoId);
          }}
        />
      ) : (
        <TextList
          data={listSearch}
          onPress={async text => {
            await onFetch(text);
            if (ref) {
              ref.current.scrollToOffset({offset: 0});
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    ...appStyles.row,
    ...appStyles.spaceBetween,
    ...appStyles.hCenter,
    height: 60,
    borderBottomWidth: 1,
  },
  inputView: {
    width: Constants.window.width - 28 - 30,
    height: 40,
  },
  radius: {
    borderRadius: 40,
  },
  listFooter: {
    ...appStyles.fullWidth,
    ...appStyles.pTSm,
    height: 120,
  },
});

export default Search;
