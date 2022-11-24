import { getClientTop, getScrollBar } from '../util'
import { ref, onUnmounted } from 'vue'
export default function useBar(wrap) {
  const bary = ref(null)
  const barx = ref(null)
  const barbcy = ref(null)
  const barbcx = ref(null)
  const isMouse = ref(false)
  const scrollBarY = ref(0)  // 鼠标点击Y轴滚动条中的高度，(位置错误时会出现鼠标与滚动条不同步)
  const scrollBarX = ref(0)  // 鼠标点击X轴滚动条中的高度，(位置错误时会出现鼠标与滚动条不同步)
  const scrollType = ref('') // 鼠标点击轴 类型

  // 点击滚动条背景跳转过去
  const clickScrollbarBc = (event) => {
    if (event.ctrlKey || event.button === 2) return

    scrollType.value = event.target.dataset.type

    if (scrollType.value === 'y') scrollBarY.value = bary.value.offsetHeight / 2 // 模拟滑动距离
    else if (scrollType.value === 'x') scrollBarX.value = barx.value.offsetWidth / 2 // 模拟滑动距离

    const { value, type } = cleanScrollType(event)
    const length = 10
    const speed  = Math.ceil((value - wrap.value[type]) / length)
    let index = 0

    const setAnTime = window.requestAnimationFrame || (fn => setTimeout(fn, 10))
    const setScroll = () => {
      wrap.value[type] += speed

      if (index < length) setAnTime(setScroll)
      index += 1
    }
    setAnTime(setScroll)
  }

  // 点击拖动滚动条
  const clickSlideScrollbar = (event) => {
    if (event.ctrlKey || event.button === 2) return // 防止右键点击

    isMouse.value = true
    scrollType.value = event.target.dataset.type

    if (scrollType.value === 'y') scrollBarY.value = event.clientY - getClientTop(event.currentTarget).top
    else if (scrollType.value === 'x') scrollBarX.value = event.clientX - getClientTop(event.currentTarget).left

    document.addEventListener('mousemove', slideMouse, false)
    document.addEventListener('mouseup', leaveMouse, false)
    document.onselectstart = () => false
  }

  // 拖动滚动条
  const slideMouse = (event) => {
    if (!isMouse.value) return
    const { value, type } = cleanScrollType(event)
    wrap.value[type] = value
  }

  // 清洗 x轴还是y轴
  const cleanScrollType = (event) => {
    const data = { value: 0, type: '' }
    let params = {}

    switch (scrollType.value) {
      case 'y':
        params = {
          barSize: barbcy.value.offsetHeight,
          nowBarbc: event.clientY,
          wrapSize: wrap.value.scrollHeight,
          scrollBar: scrollBarY.value,
          startBarbc: getClientTop(barbcy.value).top,
        }
        data.value = getScrollBar(params)
        data.type  = 'scrollTop'
        break
      case 'x':
        params = {
          barSize: barbcx.value.offsetWidth,
          nowBarbc: event.clientX,
          wrapSize: wrap.value.scrollWidth,
          scrollBar: scrollBarX.value,
          startBarbc: getClientTop(barbcx.value).left,
        }
        data.value = getScrollBar(params)
        data.type  = 'scrollLeft'
        break
    }
    return data
  }

  // 拖动滚动条结束
  const leaveMouse = () => {
    if (!isMouse.value) return

    isMouse.value = false
    document.removeEventListener('mousemove', slideMouse, false)
    document.onselectstart = null
  }

  // 卸载mouseup事件
  onUnmounted(() => {
    document.removeEventListener('mouseup', leaveMouse, false)
  })

  return {
    wrap,
    barx,
    bary,
    barbcx,
    barbcy,
    clickScrollbarBc,
    clickSlideScrollbar,
  }
}
