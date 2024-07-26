import axios from 'axios';
import ytdl from '@fmusic-lib';
import {
  parseSearchNextResponse,
  parseSearchResponse,
} from 'networkings/responses/SearchResponse';
import {parseAlbumsResponse} from 'networkings/responses/AlbumsResponse';
import {parseSuggestQueries} from 'networkings/responses/SuggestqueriesResponse';
import useNetworking from 'hooks/useNetworking';
import useAppScript from 'hooks/useAppScript';

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
const AppScript =
  'https://script.google.com/macros/s/AKfycbzpZrfOnNbpFuWbicMTgWQ_vkQeqqifmtzhCjWxPyIvea3qPxYJFSDJdTl9LoVoBADklQ/exec';
const Endpoint = 'youtubei/v1/';
const Key = '&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
const PrettyPrint = '?prettyPrint=false';
const SuggestQueries =
  'https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&callback=google.sbox.p50&q=';

const URL = {
  SwJSdata: Main + 'sw.js_data',
  Search: Main + Endpoint + 'search' + PrettyPrint + Key,
  Next: Main + Endpoint + 'next' + PrettyPrint + Key,
  SuggestQueries,
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

  let headers = useNetworking.getState().requestHeader ?? {};
  let response = await axios.post(URL.Next, body, {
    headers: JSON.parse(JSON.stringify(headers)),
  });
  return parseAlbumsResponse(response);
};

export const getSuggestqueries = async text => {
  let url = `${URL.SuggestQueries}${text}`;
  let headers = useNetworking.getState().requestHeader ?? {};
  let response = await axios.get(url, {
    headers: JSON.parse(JSON.stringify(headers)),
  });
  return parseSuggestQueries(response.data);
};

export const getVideoInfo = async videoId => {
  let url = `${Main}watch?v=${videoId}`;
  return await ytdl.getInfo(url);
};

export const getAppScript = async () => {
  const setAppScript = useAppScript.getState().setAppScript;
  let response = await axios.get(AppScript);
  if (response.data) {
    setAppScript(response.data);
  }
};
