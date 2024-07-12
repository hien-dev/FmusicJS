import {get, head, last} from 'lodash';

export const parseVideo = res => {
  if (!res) {
    return undefined;
  }
  let detail = get(res, 'videoDetails', undefined);
  let streaming = head(get(res, 'player_response.streamingData.formats', []));
  let poster = {
    url: last(detail.thumbnails)?.url,
    width: streaming?.width,
    height: streaming?.height,
  };
  let source = {
    uri: streaming?.url,
    metadata: {
      title: detail?.title,
      imageUri: poster?.url,
    },
  };

  return {
    videoId: detail?.videoId,
    source,
    title: detail?.title,
    relatedVideos: get(res, 'related_videos', []),
    poster,
    author: detail?.author?.name,
  };
};
