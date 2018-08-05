import { observable, action } from 'mobx';
import Server from 'model/server';

class Servers {
  @observable servers = [];
  @observable total = -1;
  @observable start = 0;
  @observable step  = 20;

  @action
  setStart = start => this.start = start;

  @action
  list(step = 20) {
    if (this.total !== -1 && this.total <= this.servers.length) return Promise.resolve(this.servers);

    return Server
    .find({
      limit: [this.start, step]
    }, '/site')
    .then(servers => {
      if (servers.items.length) {
        this.start += step;
        this.total = servers.total;
        this.servers = this.servers.concat(servers.items);
      }
      return Promise.resolve(this.servers);
    })
    .catch(() => {});
  };
}

export default new Servers();