
import { getScollbarWidth, addWindowResize, delWindowResize, getScrollDistance, getScrollbarSize } from '../util'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

export default function useWrap(scrollY, scrollX, defau, axis) {
  const wrap   = ref(null)
  const reszie = ref(null)
  const isScroll  =  ref(false) // 是否同时显示 x 和 y 轴
  const wrapStyle = ref('') // wrap标签的样式

  const init = () => {
    isScroll.value = (!scrollY.value && !scrollX.value)
    getWrapStyle()

    if (!defau.value) getWrapSize()
  }

  onMounted(() => { init(); addWindowResize(reszie.value, getWrapSize) })
  onBeforeUnmount(() => { delWindowResize(reszie.value, getWrapSize) })
  watch(scrollX, init)
  watch(scrollY, init)
  watch(defau, init)

  // 判断是否 Y轴或X轴、是否出现滚动条
  const isScrollShow = (type) => {
    const data = { scrollY, scrollX }

    if (!defau.value && data[type].value) return true
    else if (!defau.value && isScroll.value) return true
    else return false
  }

  // 隐藏 x、y轴滚动条
  const getWrapStyle = () => {
    if (!defau.value) {
      const width = getScollbarWidth()
      wrapStyle.value = `margin-right:${width}px; padding-bottom: ${Math.abs(width)}px`
    } else wrapStyle.value = ''
  }

  // 计算滚动条的宽高
  const getWrapSize = () => {
    const { w, h } = getScrollbarSize(wrap.value)
    axis.value.h = h
    axis.value.w = w
  }

  // 监听scroll事件 - 修改x、y轴滚动位置
  const getWrapDistance = (event) => {
    if (defau.value) return
    const { x, y } = getScrollDistance(event.target)
    axis.value.y = y
    axis.value.x = x
  }

  return {
    wrap,
    reszie,
    wrapStyle,
    isScrollShow,
    getWrapDistance,
  }
}
