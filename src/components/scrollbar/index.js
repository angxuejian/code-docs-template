import Scrollbar from './src/index'

// 注册为 use使用
Scrollbar.install = function(Vue) {
  Vue.component(Scrollbar.name, Scrollbar)
}

export default Scrollbar
