import Scrollbar from '@/components/scrollbar/index.js'
import Switch from '@/components/switch/index.js'
const Components = [
  Scrollbar, // 滚动条
  Switch, // 开关
]

export default (Vue) => {
  Components.forEach(item => { Vue.use(item) })
}