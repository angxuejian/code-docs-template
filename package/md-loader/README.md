# @angxuejian/md-loader

markdown文件转vue文件

## Tips
1. 需引入 vue和sass 包
2. vue和@vue/compiler-sfc包 为3.0.0版本
3. sass和sass-loader包 为1.26.5和8.0.2版本
4. 该版本样式不支持 lang 和 scoped 属性
5. 组件默认引用地址`src/views/examples/demo/`。如需修改前往`md-loader/utils/util`下的`readComponent和importComponent`函数修改即可