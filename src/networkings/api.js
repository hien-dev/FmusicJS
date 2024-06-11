import axios from 'axios';
import RequestBody from './requests/RequestBody';
import {searchResponse} from './responses/SearchResponse';

export default class API {
  static RequestBody = RequestBody;
  static URL = class URL {
    static Main = 'https://www.youtube.com';
    static #Gapis = 'https://youtubei.googleapis.com';

    static #Endpoint = '/youtubei/v1/';
    static #Parameter =
      '?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false';

    static #Search = 'search';
    static #Suggestion = 'get_search_suggestions';
    static #Browse = 'browse';
    static #Next = 'next';
    static #Audio = 'player';

    static SwJSdata = this.Main + '/sw.js_data';
    static Search = this.Main + this.#Endpoint + this.#Search + this.#Parameter;
    static Suggestion =
      this.Main + this.#Endpoint + this.#Suggestion + this.#Parameter;
    static Browse = this.Main + this.#Endpoint + this.#Browse + this.#Parameter;
    static Next = this.Main + this.#Endpoint + this.#Next + this.#Parameter;
    static Audio = this.Main + this.#Endpoint + this.#Audio + this.#Parameter;
    static Stream =
      this.#Gapis + this.#Endpoint + this.#Audio + this.#Parameter;
  };

  static initRequestHeader;
  static initialize() {
    axios
      .get(this.URL.SwJSdata)
      .then(res => {
        this.initRequestHeader = res.headers;
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }

  /**
   * @returns {searchResponse}
   */
  static async getSearchResults(query = 'remix tiktok') {
    const body = API.RequestBody.DEFAULT;
    body.query = query;
    let headers = this.initRequestHeader || {};
    let response = await axios.post(this.URL.Search, body, {
      headers: JSON.parse(JSON.stringify(headers)),
    });
    console.log(JSON.stringify(response.data));
  }
}
