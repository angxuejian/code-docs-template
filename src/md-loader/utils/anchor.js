const mdAnchor = require('markdown-it-anchor')
const slugify = require('transliteration').slugify

module.exports = {
  anchorPlugin: mdAnchor,
  options: [{
    level: 1,
    slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
  }],
}

// https://github.com/valeriangalliat/markdown-it-anchor/blob/master/README-zh_CN.md#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F
