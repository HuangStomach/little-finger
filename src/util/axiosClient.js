import axios from 'axios';
class Axios{
  constructor() {
    this.client = axios.create({
      baseURL: 'http://123.59.41.56:4000',
      timeout: 5000,
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Axios();
    }
    return this.instance;
  }
}

export default  Axios.getInstance();