import React, {useMemo} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from 'components/Text';
import API from 'networkings/api';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import ListRenderer from './listRenderer';

const Home = () => {
  const theme = useTheme();
  const {data} = useQuery({
    queryKey: ['Home-List'],
    queryFn: () => API.getSearchResults(),
  });

  const dataPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text bold fontSize={appStyles.md} color={theme.colors.text}>
        Fmusic
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data ?? dataPlaceholderList}
        initialNumToRender={30}
        renderItem={({item, index}) => (
          <ListRenderer
            item={item}
            index={index}
            onPress={value => {
              API.getStream(value.videoId);
            }}
          />
        )}
        ListFooterComponent={<View style={appStyles.listFooter} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
  listFooter: {
    ...appStyles.fullWidth,
    height: 200,
  },
});

export default Home;
