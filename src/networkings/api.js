import axios from 'axios';
import ytdl from '@ytdl-core';
import {
  parseSearchNextResponse,
  parseSearchResponse,
} from 'networkings/responses/SearchResponse';
import {parseAlbumsResponse} from 'networkings/responses/AlbumsResponse';
import useNetworking from 'hooks/useNetworking';

const RequestBody = {
  context: {
    client: {
      visitorData: 'Cgstc2ZpcWQtQ0FBYyjQz6KzBjIKCgJKUBIEGgAgIA%3D%3D',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36,gzip(gfe)',
      clientName: 'WEB',
      clientVersion: '2.20240216.03.00',
    },
  },
};

const Main = 'https://www.youtube.com/';
const Endpoint = 'youtubei/v1/';
const Key = '&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
const PrettyPrint = '?prettyPrint=false';

const URL = {
  SwJSdata: Main + 'sw.js_data',
  Search: Main + Endpoint + 'search' + PrettyPrint + Key,
  Next: Main + Endpoint + 'next' + PrettyPrint + Key,
};

export const initRequestHeader = async () => {
  const setRequestHeader = useNetworking.getState().setRequestHeader;
  let res = await axios.get(URL.SwJSdata);
  if (res.headers) {
    setRequestHeader(res.headers);
    return true;
  }
};

export const getSearchResults = async ({
  query = 'H20 remix',
  continuation = undefined,
}) => {
  const params = continuation ? {continuation: continuation} : {query: query};
  let body = Object.assign(params, RequestBody);
  let headers = useNetworking.getState().requestHeader ?? {};

  let response = await axios.post(URL.Search, body, {
    headers: JSON.parse(JSON.stringify(headers)),
  });

  return continuation
    ? parseSearchNextResponse(response)
    : parseSearchResponse(response);
};

export const getAlbums = async ({videoId, playlistId}) => {
  const params = {videoId: videoId, playlistId: playlistId};
  let body = Object.assign(params, RequestBody);

  let headers = useNetworking.getState().requestHeader;
  let response = await axios.post(URL.Next, body, {
    headers: JSON.parse(JSON.stringify(headers)),
  });
  return parseAlbumsResponse(response);
};

export const getVideoInfo = async videoId => {
  let url = `${Main}watch?v=${videoId}`;
  return await ytdl.getInfo(url);
};
