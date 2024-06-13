import React, {useMemo} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useQuery} from '@tanstack/react-query';
import Text from 'components/Text';
import API from 'networkings/api';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import ListRenderer from './listRenderer';
import {useVideoStore} from 'stores/videoStore';
import LoadingView from 'components/LoadingView';

const Home = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {setVideo} = useVideoStore();

  const {data} = useQuery({
    queryKey: ['Home-List'],
    queryFn: () => API.getSearchResults(),
  });

  const dataPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);

  const mutationGetStream = useMutation({
    mutationFn: videoId => API.getStream(videoId),
    onSuccess: res => {
      setVideo(res);
    },
  });

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.height40}>
        <Text bold fontSize={appStyles.md} color={theme.colors.text}>
          Fmusic
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data ?? dataPlaceholderList}
        initialNumToRender={30}
        renderItem={({item, index}) => (
          <ListRenderer
            item={item}
            index={index}
            onPress={value => {
              mutationGetStream.mutate(value.videoId);
            }}
          />
        )}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
      {mutationGetStream.isPending && <LoadingView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
  height40: {
    height: 40,
  },
  listFooter: {
    ...appStyles.fullWidth,
    height: 100,
  },
});

export default Home;
