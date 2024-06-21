import axios from 'axios';
import ytdl from '@ytdl-core';
import RequestBody from './requests/RequestBody';
import {
  parseSearchNextResponse,
  parseSearchResponse,
} from './responses/SearchResponse';

export default class API {
  static RequestBody = RequestBody;
  static URL = class URL {
    static Main = 'https://www.youtube.com/';
    static #Endpoint = 'youtubei/v1/';
    static #Key = '?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
    static #PrettyPrint = '&prettyPrint=false';

    static #SwJS = 'sw.js_data';
    static #Search = 'search';
    static #Suggestion = 'get_search_suggestions';
    static #Browse = 'browse';
    static #Next = 'next';
    static #Audio = 'player';

    static SwJSdata = this.Main + this.#SwJS;
    static Search =
      this.Main + this.#Endpoint + this.#Search + this.#Key + this.#PrettyPrint;
    // static Suggestion =
    //   this.Main + this.#Endpoint + this.#Suggestion + this.#Parameter;
    // static Browse = this.Main + this.#Endpoint + this.#Browse + this.#Parameter;
    // static Next = this.Main + this.#Endpoint + this.#Next + this.#Key;
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
    query = 'h20 remix',
    continuation = undefined,
  }) {
    let body = API.RequestBody.DEFAULT;
    if (continuation) {
      body.continuation = continuation;
      delete body.query;
    } else {
      body.query = query;
      delete body.continuation;
    }
    let headers = this.initRequestHeader || {};
    let response = await axios.post(this.URL.Search, body, {
      headers: JSON.parse(JSON.stringify(headers)),
    });
    return continuation
      ? parseSearchNextResponse(response)
      : parseSearchResponse(response);
  }

  static async getStream(videoId) {
    let url = `${this.URL.Main}watch?v=${videoId}`;
    return await ytdl.getInfo(url);
  }
}
