import hljs from 'highlight.js'

hljs.configure({
  ignoreUnescapedHTML: true, // 关闭 html未转义的警告 https://github.com/highlightjs/highlight.js/wiki/security
})
const setHighlight = el => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => { hljs.highlightBlock(block) });
}
export default {
  mounted(el) {
    setHighlight(el)
  },
  updated (el) {
    setHighlight(el)
  },
}