import { observable, action } from 'mobx';
import Site from 'model/site';

class Sites {

  @observable sites = [];
  @observable total = -1;
  @observable start = 0;
  @observable step  = 20;

  status = {
    '0': { value: 0, color: '#999999', label: '休眠' },
    '10': { value: 10, color: '#333333', label: '待机' },
    '20': { value: 20, color: '#00CC00', label: '正常' },
    '30': { value: 30, color: '#0099FF', label: '信息' },
    '40': { value: 40, color: '#FFCC00', label: '警告' },
    '50': { value: 50, color: '#FF0000', label: '错误' },
    '60': { value: 60, color: '#CC00FF', label: 'GG' },
  };

  @action 
  clearData = () => {
    this.sites = [];
    this.start = 0;
  }

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