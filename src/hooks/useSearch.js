import {useCallback, useMemo, useState} from 'react';
import useNetworking from 'hooks/useNetworking';
import {getSearchResults} from 'networkings/api';
import RealmContext from 'realms/realm';
import SearchRealm from 'realms/searchRealm';

const useSearch = () => {
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();
  const [videos, setVideos] = useState([]);
  const {setLoading} = useNetworking();
  const [continuation, setContinuation] = useState(undefined);

  const searchRealm = useQuery({
    type: SearchRealm,
    query: e => {
      return e.sorted('createDate', true);
    },
  });

  const listSearch = useMemo(() => {
    return searchRealm.slice(0, 20);
  }, [searchRealm]);

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

  return {videos, listSearch, onFetch, onNext};
};

export default useSearch;
