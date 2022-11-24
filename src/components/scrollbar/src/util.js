
import ResizeObserver from 'resize-observer-polyfill'


// 返回元素的大小及其相对于视口的位置。
export const getClientTop = (dom) => dom.getBoundingClientRect()

// 计算滚动条的宽度或者高度、
// 要与原生滚动条的宽高一致、否则会出现滚动过多或过少
export const getScrollbarSize = function(params) {
  const { clientHeight, scrollHeight, clientWidth, scrollWidth } = params

  // 滚动条高度 = 盒子高度 / 盒子滚动区域高度 * 换算为百分比
  return {
    h: clientHeight / scrollHeight * 100,
    w: clientWidth / scrollWidth * 100,
  }
}

// 计算鼠标滚动 距离
export const getScrollDistance = function(params) {
  const { scrollTop, clientHeight, scrollLeft, clientWidth } = params

  // 滚动条滚动高度 = 盒子内容滚动高度 / 盒子滚动区域高度 * 换算为百分比
  return {
    y: scrollTop / clientHeight * 100,
    x: scrollLeft / clientWidth * 100,
  }
}

/**
 * 计算滚动条 Y轴 或 X轴 滚动区域高度
 * @param {number} params.nowBarbc   鼠标拖动时当前滚动条背景(顶部或者左边) 距离页面(顶部或者左边)距离
 * @param {number} params.barSize    滚动条(高度或者宽度)
 * @param {number} params.wrapSize   盒子滚动区域(高度或者宽度)
 * @param {number} params.scrollBar  鼠标点击(Y轴或者X轴)滚动条中的(高度或者宽度)
 * @param {number} params.startBarbc 滚动条背景(顶部或者左边) 距离页面(顶部或者左边)距离
 * @returns 盒子内容滚动高度
 */
export const getScrollBar = function(params) {
  if (!params) return

  const integer = 100  // 换算为 整数
  const { startBarbc, nowBarbc, scrollBar, barSize, wrapSize } = params

  /**
   * nowBcSize：拖动时(高度或者宽度)
   * scroll   ：滚动条滚动(高度或者宽度)
   * boxScroll：盒子内容滚动(高度或者宽度)
   */
  const nowBcSize = nowBarbc - startBarbc
  const scroll    = ((nowBcSize - scrollBar) / barSize) * integer
  const boxScroll = scroll * wrapSize / integer
  return boxScroll
}

export const addWindowResize = function(el, fn) {
  el.__ro__ = new ResizeObserver(() => { fn() })
  el.__ro__.observe(el)
}

export const delWindowResize = function(el) {
  el.__ro__.disconnect()
}


let scrollbarWidth = 0
export const getScollbarWidth =  function() {
  if (scrollbarWidth) return scrollbarWidth

  const outer = document.createElement('div')
  const inner = document.createElement('div')

  outer.style = 'position: absolute;left: -999;top: -999;visibility: hidden;width: 100px;overflow: scroll;'
  inner.style = 'width: 100%'

  outer.appendChild(inner)
  document.body.appendChild(outer)

  scrollbarWidth = inner.offsetWidth - outer.offsetWidth - 2

  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}
