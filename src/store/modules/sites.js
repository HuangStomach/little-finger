import { observable, action } from 'mobx';
import Site from 'model/site';

class Sites {
  @observable sites = [];
  @observable total = -1;
  @observable start = 0;
  @observable step  = 20;

  @action
  setStart = start => this.start = start;

  @action
  list(step = 20) {
    if (this.total !== -1 && this.total <= this.sites.length) return Promise.resolve(this.sites);

    return Site
    .find({
      limit: [this.start, step]
    }, '/site')
    .then(sites => {
      if (sites.items.length) {
        this.start += step;
        this.total = sites.total;
        this.sites = this.sites.concat(sites.items);
      }
      return Promise.resolve(this.sites);
    })
    .catch(() => {});
  };


}

export default new Sites();