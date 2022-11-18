# Markdown 扩展

## 自定义容器
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: demo 这是demo/html语法容器，**最外层只支持一个父标签样式, 并且不支持template标签**
```html
<span @click='clickMe'> click me </span>

<script>
  export default {
    methods: {
      clickMe: function() {
        alert('虎年大吉')
      }
    }
  }
</script>

<style>
  span {
    color: #438EDB;
    cursor: pointer;
  }
</style>
```
:::


::: demo 这是demo/component语法容器，只支持 `views/examples/demo` 文件下的组件
``` component
<readme/index />
```
:::

:::warning
使用**html**代码块```加载<script>与<style>标签时```，编译代码会提出警告```Tags with side effect (<script> and <style>) are ignored in client component templates``` ，而使用 **component**代码块，将没有任何问题
:::

## 表格
name | age
---  | ---  
玉华 | 18
苦厄 | 22  