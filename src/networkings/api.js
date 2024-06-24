import axios from 'axios';
import ytdl from '@ytdl-core';
import RequestBody from 'networkings/requests/RequestBody';
import {
  parseSearchNextResponse,
  parseSearchResponse,
} from 'networkings/responses/SearchResponse';

export default class API {
  static RequestBody = RequestBody;
  static URL = class URL {
    static Main = 'https://www.youtube.com/';
    static #Endpoint = 'youtubei/v1/';
    static #Key = '&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
    static #PrettyPrint = '?prettyPrint=false';

    static #SwJS = 'sw.js_data';
    static #Search = 'search';
    static #Next = 'next';

    static SwJSdata = this.Main + this.#SwJS;
    static Search =
      this.Main + this.#Endpoint + this.#Search + this.#PrettyPrint + this.#Key;
    static Next =
      this.Main + this.#Endpoint + this.#Next + this.#PrettyPrint + this.#Key;
  };

  static initRequestHeader;
  static async initialize() {
    let res = await axios.get(this.URL.SwJSdata);
    if (res.headers) {
      this.initRequestHeader = res.headers;
    }
    return true;
  }

  /**
   * @returns {parseSearchResponse}
   */
  static async getSearchResults({
    query = 'Co chan nhan',
    continuation = undefined,
  }) {
    let body = Object.assign({}, API.RequestBody.DEFAULT);
    if (continuation) {
      body.continuation = continuation;
    } else {
      body.query = query;
    }
    let headers = this.initRequestHeader || {};
    let response = await axios.post(this.URL.Search, body, {
      headers: JSON.parse(JSON.stringify(headers)),
    });
    return continuation
      ? parseSearchNextResponse(response)
      : parseSearchResponse(response);
  }

  static async getAlbums({videoId, playlistId}) {
    let body = Object.assign({}, API.RequestBody.DEFAULT);
    body.videoId = videoId;
    body.playlistId = playlistId;
    let headers = this.initRequestHeader || {};
    let response = await axios.post(this.URL.Next, body, {
      headers: JSON.parse(JSON.stringify(headers)),
    });
    console.log(JSON.stringify(response.data));
    return {};
  }

  static async getStream(videoId) {
    let url = `${this.URL.Main}watch?v=${videoId}`;
    return await ytdl.getInfo(url);
  }
}
