import { observable, computed, action } from 'mobx';
import Server from 'model/server';

class Servers {
  @observable servers = [];
  @observable allServers = [];
  total = 0;


  @action
  list = (start = 0, step = 20) => {
    //if (this.servers.length >= (start + 1) * step) return Promise.resolve(this.servers);

    return Server
    .find({
      limit: [start, step]
    }, '/site')
    .then(servers => {
      if (servers.items.length) {
        this.total   = servers.total;
        this.servers = servers.items;
        this.allServers = this.allServers.concat(servers.items);
      }
      return Promise.resolve(this.servers);
    })
    .catch(() => {});
  }
}

export default new Servers();