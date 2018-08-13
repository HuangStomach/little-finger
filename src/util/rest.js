import qs from 'qs';
import Client from '../store/modules/client'

let setData = (object, data) => {
  if (typeof object.setData === 'function') return object.setData(data);

  for (let [key, value] of Object.entries(data)) {
    if (Reflect.has(object, key)) {
      Reflect.set(object, key, value)
    }
  }
  return object;
};

//TODO: 全部三元运算符导入配置非常不优雅
export default class Rest {
  constructor(path = null, query = null ) {
    this._client = Client.get(new.target.name);
    this._name = this._configs ? this._configs.source : new.target.name.toLowerCase();
    if (path === null && query === null) return this;
    this._client.get(`${this._name}/${path}`, {params: query}).then(r => {setData(this, r.data);}).catch(e => {});
  }
  
  async save() {
    // 需要做简单的值拷贝并去掉约定的私有属性
    const params = Object.assign({}, this);
    Reflect.deleteProperty(params, '_configs');
    Reflect.deleteProperty(params, '_client');

    if (params.id === 0) return await this._client.post(this._name, qs.stringify(params));
    else return await this._client.put(`${this._name}/${params.id}`, qs.stringify(params));
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
          model = m.default;
          return Client.get(name).get(path ? path : name, {
            params: query
          });
        })
        .then(r => {
          let total = r.data.total;
          const items = r.data.data.map(item => {
            let object = new (model)();
            return setData(object, item);
          });
          resolve({ items, total })
        }, r => {
          reject();
        })
        .catch(() => {
          console.log(32323)
        });
    });
  }
}
