import {useState} from 'react';
import {head} from 'lodash';
import {getAlbums} from 'networkings/api';

const useAlbum = () => {
  const [albums, setAlbums] = useState(undefined);
  const [pages, setPages] = useState(undefined);
  const [renderPage, setRenderPage] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const onFetch = async ({videoId, playlistId}) => {
    try {
      let res = await getAlbums({
        videoId: videoId,
        playlistId: playlistId,
      });
      setAlbums(res);
      setPages(generatePage(res, 25));
      setRenderPage(head(generatePage(res, 25)));
    } catch (error) {
      console.log(`[error] onFetch: ${JSON.stringify(error)}`);
    }
  };

  const generatePage = (array, chunkSize) => {
    let results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const onEndReached = () => {
    if (albums && albums.length > renderPage.length) {
      let nextPage = pages[renderPage.length / 25];
      setRenderPage(renderPage.concat(nextPage));
    } else {
      setLoading(false);
    }
  };

  return {albums, renderPage, loading, onFetch, onEndReached};
};

export default useAlbum;
