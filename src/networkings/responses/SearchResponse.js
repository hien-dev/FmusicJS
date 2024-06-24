import {get, last} from 'lodash';

export const parseSearchResponse = response => {
  let itemSectionContents = get(
    response,
    'data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents',
    {},
  );
  let continuation = get(
    response,
    'data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token',
    '',
  );
  let data = itemSectionContents.filter(
    e =>
      e.playlistRenderer !== undefined ||
      (e?.videoRenderer !== undefined &&
        e?.videoRenderer?.lengthText?.simpleText !== undefined),
  );
  return {data, continuation};
};

export const parseSearchNextResponse = response => {
  let itemSectionContents = get(
    response,
    'data.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems[0].itemSectionRenderer.contents',
    {},
  );
  let continuation = get(
    response,
    'data.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token',
    '',
  );
  let data = itemSectionContents.filter(
    e =>
      e.playlistRenderer !== undefined ||
      (e?.videoRenderer !== undefined &&
        e?.videoRenderer?.lengthText?.simpleText !== undefined),
  );
  return {data, continuation};
};

export const parseSearch = item => {
  let videoId =
    get(
      item,
      'playlistRenderer.navigationEndpoint.watchEndpoint.videoId',
      undefined,
    ) ?? get(item, 'videoRenderer.videoId', undefined);
  let thumbnail =
    last(get(item, 'playlistRenderer.thumbnails[0].thumbnails', []))?.url ??
    last(get(item, 'videoRenderer.thumbnail.thumbnails'))?.url;
  let title =
    get(item, 'playlistRenderer.title.simpleText', undefined) ??
    get(item, 'videoRenderer.title.runs[0].text', '');
  return {
    videoId: videoId,
    playlistId: get(item, 'playlistRenderer.playlistId', undefined),
    title: title,
    thumbnail: thumbnail,
    description: parseDescription(item),
  };
};

const parseDescription = item => {
  if (item?.playlistRenderer) {
    return get(item, 'playlistRenderer.shortBylineText.runs[0].text', '');
  }
  if (item?.videoRenderer) {
    const start = get(item, 'videoRenderer.longBylineText.runs[0].text', '');
    const end = get(item, 'videoRenderer.publishedTimeText.simpleText', '');
    return start !== '' ? start + ' • ' + end : end;
  }
  return '';
};
