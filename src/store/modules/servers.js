import { observable, action, computed } from 'mobx';
import Server from 'model/server';

class Servers {
  @observable servers = [];
  @observable total = -1;
  @observable start = 0;
  @observable step  = 20;

  @computed get pages() {
    return Math.ceil(this.total / this.step);
  }

  @action
  handleStart = (start) => {
    this.start = start;
  };

  @action
  list = (start = 0) => {
    start *= this.step;
    if (this.total != -1 && this.total <= this.servers.length) return Promise.resolve(this.servers);

    return Server
    .find({
      limit: [start, this.step]
    }, '/site')
    .then(servers => {
      if (servers.items.length) {
        this.total   = servers.total;
        this.servers = this.servers.concat(servers.items);
      }
      return Promise.resolve(this.servers);
    })
    .catch(() => {});
  };
}

export default new Servers();