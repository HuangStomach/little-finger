import { observable } from 'mobx';
import Rest from 'util/rest';

export default class Site extends Rest {
  @observable _configs = { 
    source: 'site',
    baseURL: 'http://123.59.41.56:4000',
  };
  id = 0;
  name = '';
  lab = '';
  site = '';
  fqdn = '';
  address = '';
  path = '';
  @observable status = 0;
  @observable free = 0.0;
  @observable top = 0.0;
  @observable level = 0;
  @observable active = 0;
  @observable update = '';
}
