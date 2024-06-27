import {get, last, head} from 'lodash';

export const parseAlbumsResponse = response => {
  return get(
    response,
    'data.contents.twoColumnWatchNextResults.playlist.playlist.contents',
    [],
  );
};

export const parseAlbum = item => {
  let messageRenderer = get(item, 'messageRenderer', undefined);
  if (messageRenderer) {
    return {
      message: {
        text: messageRenderer.subtext.messageSubtextRenderer.text.simpleText,
      },
    };
  }

  let playlistPanelVideoRenderer = get(item, 'playlistPanelVideoRenderer', {});
  let title = get(playlistPanelVideoRenderer, 'title.simpleText', '');
  let thumbnail = head(
    get(playlistPanelVideoRenderer, 'thumbnail.thumbnails', []),
  )?.url;
  let description = last(
    get(playlistPanelVideoRenderer, 'shortBylineText.runs', []),
  )?.text;
  return {
    videoId: playlistPanelVideoRenderer.videoId,
    title,
    thumbnail,
    description,
  };
};
