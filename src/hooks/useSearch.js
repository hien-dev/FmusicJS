import {useCallback, useMemo, useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {isEmpty} from 'lodash';
import useNetworking from 'hooks/useNetworking';
import {getSearchResults, getSuggestqueries} from 'networkings/api';
import RealmContext from 'realms/realm';
import SearchRealm from 'realms/searchRealm';

const useSearch = () => {
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();
  const [videos, setVideos] = useState([]);
  const {setLoading} = useNetworking();
  const [searchText, setSearchText] = useState('');
  const [continuation, setContinuation] = useState(undefined);
  const [suggestQueries, setSuggestQueries] = useState(undefined);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Cleanup the listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const searchRealm = useQuery({
    type: SearchRealm,
    query: e => {
      return e.sorted('createDate', true);
    },
  });

  const onChangeText = useCallback(
    async value => {
      setSearchText(value);
      await onSuggestqueries(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText],
  );

  const listSearch = useMemo(() => {
    return (isEmpty(searchText) ? searchRealm : suggestQueries).slice(0, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestQueries, searchRealm]);

  const onSuggestqueries = async query => {
    if (isEmpty(query)) {
      setSuggestQueries(undefined);
      return;
    }
    try {
      let res = await getSuggestqueries(query);
      setSuggestQueries(res);
    } catch (error) {
      setSuggestQueries([]);
    }
  };

  const onFetch = async query => {
    setLoading(true);
    try {
      let res = await getSearchResults({query});
      setVideos(res.data);
      setContinuation(res?.continuation);
      saveSearchRealm(query);
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

  const saveSearchRealm = useCallback(
    text => {
      if (realm) {
        let existVideo = realm.objectForPrimaryKey(SearchRealm, text);
        if (!existVideo) {
          realm.write(() => {
            realm.create(SearchRealm, {
              text: text,
            });
          });
        }
      }
    },
    [realm],
  );

  return {
    videos,
    listSearch,
    keyboardVisible,
    searchText,
    setSearchText,
    onFetch,
    onNext,
    onSuggestqueries,
    onChangeText,
  };
};

export default useSearch;
