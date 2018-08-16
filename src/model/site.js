import { observable } from 'mobx';
import Rest from 'util/rest';
export default class Site extends Rest {
  @observable id = 0;
  @observable name = '';
  @observable lab = '';
  @observable site = '';
  @observable fqdn = '';
  @observable address = '';
  @observable path = '';
  @observable status = 0;
  @observable free = 0.0;
  @observable top = 0.0;
  @observable level = 0;
  @observable active = 0;
  @observable update = '';
}
