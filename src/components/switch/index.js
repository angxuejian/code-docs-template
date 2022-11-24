import Switch from './src/index'

// 注册为 use使用
Switch.install = function(Vue) {
  Vue.component(Switch.name, Switch)
}

export default Switch
