import {get, head, last} from 'lodash';

export const parseVideo = res => {
  if (!res) {
    return undefined;
  }
  let videoDetail = get(res, 'videoDetails', undefined);
  let streamingData = head(
    get(res, 'player_response.streamingData.formats', []),
  );
  let poster = {
    url: last(videoDetail.thumbnails)?.url,
    width: streamingData?.width,
    height: streamingData?.height,
  };
  let sourceVideo = {
    uri: streamingData?.url,
    metadata: {
      title: videoDetail?.title,
      imageUri: poster?.url,
    },
  };
  return {
    sourceVideo,
    videoDetail,
    relatedVideos: get(res, 'related_videos', []),
    poster,
    author: videoDetail?.author?.name,
  };
};
