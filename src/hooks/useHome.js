import {useEffect, useState} from 'react';
import {getSearchResults} from 'networkings/api';
import useNetworking from 'hooks/useNetworking';

const useHome = () => {
  const [data, setData] = useState([]);
  const {setLoading} = useNetworking();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let res = await getSearchResults({});
        setData(res);
        setLoading(false);
      } catch (error) {
        console.log(`[error] Home: ${JSON.stringify(error)}`);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {data};
};

export default useHome;
