export default 
/**
 * title: sidebar 页面名称
 * name: router 路由地址
 * path: router 路由文件地址
 * link: 是否是外链
 */
[
  {
    "title": "Markdown 扩展",
    "name": "readme",
    "path": () => import('@/views/examples/docs/readme.md')
  },
  {
    "title": "百度",
    "path": "https://www.baidu.com",
    "link": true
  }
]