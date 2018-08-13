import axios from 'axios';

class Client {
  clients = {};

  get(name = null) {
    let client = Reflect.get(this.clients, name);
    if (client == null) {
      client = axios.create({
        baseURL: 'http://123.59.41.56:4000',
        timeout: 5000,
      });
      Reflect.set(this.clients, name, client);
    }
    return client;
  }
}

export default new Client();