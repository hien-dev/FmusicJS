import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from 'components/Header';
import VerticalList from 'components/VerticalList';
import useHome from 'hooks/useHome';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useVideoPlayer from 'hooks/useVideoPlayer';
import useNavigationState from 'hooks/useNavigationState';
import appStyles from 'utils/appStyles';
import Constants, {SCREEN_NAME} from 'utils/constants';

const Home = () => {
  const areaInsets = useSafeAreaInsets();
  const {navigate} = useNavigationState();
  const {insets, setInsets, paddingTop} = useSafeArea();

  const {data} = useHome();
  const {getVideo} = useVideoPlayer();

  useEffect(() => {
    if (!insets) {
      setInsets(areaInsets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insets]);

  return (
    <View style={[appStyles.flex, appStyles.pHSm, paddingTop()]}>
      <Header
        title={'Fmusic'}
        iconName={'search'}
        onPress={() => {
          navigate(SCREEN_NAME.SEARCH);
        }}
      />
      <VerticalList
        data={data?.data ?? Constants.placeholderList}
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
    </View>
  );
};

export default Home;
