class NF{
  constructor(options){
    //设置弹窗的默认的配置选项
    this.defaultConfig = {
      title: 'hello,world',//弹窗的标题
      body: 'I love china',//弹窗的提示信息
      icon: '',//弹窗显示的图片的路径
      click() {},//点击通知
      error() {},//通知显示异常
      show() {},//通知显示
      close() {},//通知关闭
    };
    //设置是否允许弹窗的属性
    this.isPermission = true;
    //用于保存弹窗的实例
    this._instance = null;
    this.options = Object.assign(this.defaultConfig, options);
    //将属性添加到这个实例上面
    Object(this,this.options);
    //创建弹窗
    this.create(this.options);
  }

  _isPermission(){
    return Notification.permission === 'granted';
  }

  _isSupported(){
    return 'Notification' in window;
  }

  _addEvent(obj, type, fn){
    if(typeof fn !== 'function'){
      throw new Error('事件的监听器应该是一个函数');
    }
    obj.addEventListener(type, () => {
      fn.call(this);
    },false)
  }

  //create弹窗的方法
  create(options){
    //先判断 是否支持
    if(!this._isSupported()){
      throw new Error('你的浏览器，不支持Notification，请更换浏览器');
    }
    //再判断是否允许
    if(!(this.isPermission = this._isPermission())){
      //说明不被允许--获取请求
      Notification.requestPermission().then((permission) => {
        this.isPermission = permission === 'granted' ? true : false;
      })
    }

    //创建弹窗
    this._instance = new Notification(options.title, options);  //便于链式调用
    return this.show().click().close().error();
  }

  //下面是添加事件的几个方法--添加事件不仅可以在选项里面指定事件监听函数，也可以链式调用事件的处理方法
  click(callback = this.options.click){
    this._addEvent(this._instance, 'click', callback);
    return this;
  }

  error(callback = this.options.error){
    this._addEvent(this._instance, 'error', callback);
    return this;
  }

  show(callback = this.options.show){
    this._addEvent(this._instance, 'show', callback);
    return this;
  }

  close(callback = this.options.close){
    this._addEvent(this._instance, 'close', callback);
    return this;
  }

  //关闭弹窗的方法
  shut(){
    this._instance && this._instance.close();
  }

}

export default NF;