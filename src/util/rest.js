import axios from 'axios'

let setData = (object, data) => {
  if (typeof object.setData === 'function') return object.setData(data);
  
  for (let [key, value] of Object.entries(data)) {
    if (Reflect.has(object, key)) {
      Reflect.set(object, key, value)
    }
  }
  return object;
}

//TODO: 全部三元运算符导入配置非常不优雅
export default class Rest {

  constructor(path = null, query = null) {
    if (path === null && query === null) return this;

    this._client = axios.create({
      baseURL: this._configs ? this._configs.baseURL : 'https://api.github.com',
      timeout: 5000,
    });
    
    this._name = this._configs ? this._configs.source : new.target.name.toLowerCase();
    this._client.get(`${this._name}/${path}`, {
      params: query
    })
    .then(r => {
      setData(this, r.data);
    })
    .catch(e => {});
    
  }

  async save() {
    // 需要做简单的值拷贝并去掉约定的私有属性
    const params = Object.assign({}, this);
    Reflect.deleteProperty(params, '_configs');
    Reflect.deleteProperty(params, '_client');
    
    if (params.id > 0) return await this._client.post(this._name, params);
    else return await this._client.put(`${this._name}/${params.id}`, params);
  }

  async delete() {
    return await this._client.delete(`${this._name}/${this.id}`);
  }

  static find(query = {}, path = null) {
    return new Promise((resolve, reject) => {
      if (query === null) {
        reject();
        return;
      }
      
      const name = this._configs ? this._configs.source : this.name.toLowerCase();
      let model;
      import(`model/${name}`)
      .then(m => {
        model = m.default
        const client = axios.create({
          baseURL: this._configs ? this._configs.baseURL : 'https://api.github.com',
          timeout: 5000,
        });
    
        return client.get(path ? path : name);
      })
      .then(r => {
        const items = r.data.map(item => {
          let object = new (model)();
          return setData(object, item);
        })
        resolve(items)
      }, r => {
        reject()
      });
    });
  }

}
