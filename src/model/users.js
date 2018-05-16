import { observable } from 'mobx';
import Rest from 'util/rest';

export default class Users extends Rest {
  @observable id = null;
  @observable name = '';
  @observable login = '';
  @observable html_url = '';
  @observable avatar_url = '';
}
