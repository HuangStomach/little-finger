import { observable, action } from 'mobx';
import Repos from 'model/repos';

class Repo {
  @observable repos = [];
  
  @action
  myRepos = () => {
    if (this.repos.length > 0) return Promise.resolve(this.repos);

    Repos
    .find({}, '/users/huangstomach/repos')
    .then(repos => {
      this.repos = repos
      return Promise.resolve(this.repos)
    })
    .catch(() => {});
  }
}

export default new Repo();