import axios from 'axios'

let setData = (object, data) => {
  if (typeof object.setData == 'function') return object.setData(item);
  
  for (let [key, value] of Object.entries(data)) {
    if (Reflect.has(object, key)) {
      Reflect.set(object, key, value)
    }
  }
  return object;
}

export default class Rest {
  // 实际上graphql作为提交数据表现我觉得不如rest来得好 后端也不容易跟踪控制
  // 所以这里只做查询
  static find(query = {}, path = null) {
    return new Promise((resolve, reject) => {
      if (query === null) {
        reject()
        return;
      }
      
      const name = this.name.toLowerCase()
      let model;
      import(`model/${name}`)
      .then(m => {
        model = m
        const client = axios.create({
          baseURL: 'https://api.github.com',
          timeout: 5000,
        });
    
        return client.get(path ? path : name)
      })
      .then(r => {
        const items = r.data.map(item => {
          let object = new (model.default)();
          return setData(object, item);
        })
        resolve(items)
      }, r => {
        reject()
      });
    });
  }

}
