import { observable } from 'mobx';
import Rest from 'util/rest';
export default class Site extends Rest {
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
