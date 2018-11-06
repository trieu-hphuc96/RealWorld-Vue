import axios from 'axios';

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://conduit.productionready.io/api/',
    });
  }

  get(url = '', config = {}) {
    return this.instance.get(url, config);
  }

  post(url = '', data = {}, config = {}) {
    return this.instance.post(url, data, config);
  }

  put(url = '', data = {}, config = {}) {
    return this.instance.put(url, data, config);
  }
}

const http = new Http;

export default http;