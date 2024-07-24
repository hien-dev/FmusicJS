import {get, last, head} from 'lodash';

export const parseAlbumsResponse = response => {
  let contents = get(
    response,
    'data.contents.twoColumnWatchNextResults.playlist.playlist.contents',
    [],
  );
  let data = contents.map(item => parseAlbum(item));
  return data;
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
