import { observable, action } from 'mobx';
import Server from 'model/server';

class Servers {
  @observable servers = [];
  
  @action
  list = (start = 0, step = 20) => {
    if (this.servers.length >= (start + 1) * step) return Promise.resolve(this.servers);

    return Server
    .find({
      limit: [start, step]
    }, '/site')
    .then(servers => {
      if (servers.length) this.servers = this.servers.concat(servers);
      return Promise.resolve(this.servers)
    })
    .catch(() => {});
  }
}

export default new Servers();