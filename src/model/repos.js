import { observable } from 'mobx';
import Rest from 'util/rest';

export default class Repos extends Rest {
  @observable id = null;
  @observable name = '';
  @observable full_name = '';
  @observable description = '';
  @observable url = '';
  @observable size = 0;
  @observable forks_count = 0;
  @observable stargazers_count = 0;
  @observable watchers_count = 0;

  get forks() {
    return this.forks_count;
  }

  get stars() {
    return this.stargazers_count;
  }

  get watchers() {
    return this.watchers_count;
  }
}
