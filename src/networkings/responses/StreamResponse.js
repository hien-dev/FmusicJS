import {get, head, last} from 'lodash';

export const parseVideo = res => {
  if (!res) {
    return undefined;
  }
  let videoDetail = get(res, 'videoDetails', undefined);
  let poster = last(videoDetail.thumbnails)?.url;
  let sourceVideo = {
    uri: head(get(res, 'player_response.streamingData.formats', []))?.url,
    metadata: {
      title: videoDetail.title,
      imageUri: poster,
    },
  };
  return {
    sourceVideo,
    videoDetail,
    relatedVideos: get(res, 'related_videos', []),
    poster,
  };
};
