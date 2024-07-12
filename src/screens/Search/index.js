import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {isEmpty} from 'lodash';
import ListRenderer from 'components/ListRenderer';
import {getSearchResults} from 'networkings/api';
import {useNavigationStore} from 'stores/navigationStore';
import useVideoPlayer from 'hooks/useVideoPlayer';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import {Constants, SCREEN_NAME} from 'utils/constants';
import {MaterialIcons} from 'components/VectorIcons';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useNetworking from 'hooks/useNetworking';

const useSearch = () => {
  const [videos, setVideos] = useState([]);
  const {setLoading} = useNetworking();
  const [continuation, setContinuation] = useState(undefined);

  const onFetch = async query => {
    setLoading(true);
    try {
      let res = await getSearchResults({query});
      setVideos(res.data);
      setContinuation(res?.continuation);
      setLoading(false);
    } catch (error) {
      console.log(`[error] onFetch: ${JSON.stringify(error)}`);
      setLoading(false);
    }
  };

  const onNext = async () => {
    try {
      let res = await getSearchResults({query: '', continuation: continuation});
      setVideos(videos.concat(res?.data ?? []));
      setContinuation(res?.continuation);
    } catch (error) {
      console.log(`[error] onNext: ${JSON.stringify(error)}`);
    }
  };

  return {videos, onFetch, onNext};
};

const Search = () => {
  const ref = useRef(null);
  const theme = useTheme();
  const {videos, onFetch, onNext} = useSearch();
  const {paddingTop} = useSafeArea();
  const {getVideo} = useVideoPlayer();
  const {goBack, navigate} = useNavigationStore();
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
      {!isEmpty(videos) && (
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
    ...appStyles.mBSm,
    height: 60,
    borderBottomWidth: 1,
  },
  inputView: {
    width: Constants.window.width - 28 - 30,
    height: 35,
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
