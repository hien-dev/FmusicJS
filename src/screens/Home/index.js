import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/Text';
import API from 'networkings/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';

const Home = () => {
  const theme = useTheme();
  useEffect(() => {
    API.initialize();
    setTimeout(async () => {
      await API.getSearchResults();
    }, 300);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text bold fontSize={appStyles.md} color={theme.colors.text}>
        Fmusic
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
});

export default Home;
