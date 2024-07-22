import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {isEmpty} from 'lodash';
import ListRenderer from 'components/ListRenderer';
import useNavigationState from 'hooks/useNavigationState';
import useVideoPlayer from 'hooks/useVideoPlayer';
import appStyles from 'utils/appStyles';
import useTheme from 'hooks/useTheme';
import {Constants, SCREEN_NAME} from 'utils/constants';
import {MaterialIcons} from 'components/VectorIcons';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useSearch from 'hooks/useSearch';
import Text from 'components/Text';
import ListSearchText from 'components/ListSearchText';

const Search = () => {
  const ref = useRef(null);
  const theme = useTheme();
  const {videos, listSearch, onFetch, onNext} = useSearch();
  const {paddingTop} = useSafeArea();
  const {getVideo} = useVideoPlayer();
  const {goBack, navigate} = useNavigationState();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={[styles.container, paddingTop()]}>
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
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          data={videos}
          estimatedItemSize={30}
          onEndReached={() => {
            onNext();
          }}
          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <ListRenderer
              item={item}
              index={index}
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
          )}
          ListFooterComponent={
            <View style={styles.listFooter}>
              <ActivityIndicator size={'large'} color={theme.colors.icon} />
            </View>
          }
        />
      ) : (
        <FlatList
          data={listSearch}
          renderItem={({item, index}) => (
            <ListSearchText
              item={item}
              onPress={async () => {
                await onFetch(item.text);
                if (ref) {
                  ref.current.scrollToOffset({offset: 0});
                }
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
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
