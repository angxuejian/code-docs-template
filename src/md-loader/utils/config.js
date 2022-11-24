const Config = require('markdown-it-chain')
const { anchorPlugin, options } = require('./anchor')
const containerPlugin = require('./container')
const setCodeFenceHighlight = require('./fence')

const config = new Config()
config.options.html(true).end()

  .plugin('anchor')
  .use(anchorPlugin, options)
  .end()

  .plugin('containers')
  .use(containerPlugin)
  .end()

const md = config.toMd()

setCodeFenceHighlight(md)
module.exports = md

// https://github.com/ULIVZ/markdown-it-chain#getting-started
