<template>
  <div 
  class="demo-block"
  :class="{ 'demo-block__hover': hovering }"
  @mouseenter="hovering = true"
  @mouseleave="hovering = false"
  >

    <div class="component"><slot name="component"></slot></div>
    
    <div 
      class="component-source"
      :style="`height: ${componentSourceHeight}px;`"
    >
      <div v-if="$slots.desc" ref='desc' class="desc"><slot name="desc"></slot></div>
      <div ref='code'><slot name="code"></slot></div>
    </div>

    <div
      class="control"
      ref="control"
      :class="{ 'control__fixed' : isExpanded }"
      @click="isExpanded = !isExpanded"
      >
      <i :class="['iconfont', `icon-caret-${isExpanded ? 'up': 'down'}`, { 'hovering': hovering }]" aria-hidden="true"></i>
      <span :class="{ 'hovering': hovering }">{{ controlText }}</span>
    </div>

  </div>
</template>

<script>
/**
 * slots.component:  组件
 * slots.desc: 描述
 * slots.code: 组件源代码
 * slots.default: 其他代码块内容
 */
import './common/index.scss'
import { ref, computed } from 'vue'
export default {
  name: 'DemoBlock',

  setup() {
    const hovering = ref(false)
    const isExpanded = ref(false)

    const desc = ref(null)
    const code = ref(null)
    const control = ref(null)

    const controlText = computed(() => isExpanded.value ? '隐藏代码' : '显示代码')
    const componentSourceHeight = computed(() => {
      let height = 0
      if (isExpanded.value) {
        if (desc.value) {
          height = desc.value.clientHeight + code.value.clientHeight + 20
        } else height = code.value.clientHeight
      }
      return height
    })

    return {
      hovering, isExpanded,
      desc, code,
      control, 
      controlText,
      componentSourceHeight,
    }
  },
}
</script>
<style lang="scss">
.demo-block {
  border: solid 1PX var(--mo-demo-border);
  border-radius: 3PX;
  transition: .2s;
  margin-bottom: 15PX;
  &.demo-block__hover {
    box-shadow: var(--mo-demo-block-hover);
  }

  .component {
    padding: 24PX;
  }
  .component-source {
    background-color: var(--mo-hljs-bc-color);
    border-top: solid 1PX var(--mo-demo-control);
    overflow: hidden;
    height: 0;
    transition: height .2s;
  }

  

  .control {
    border-top: solid 1PX var(--mo-demo-border);
    height: 44PX;
    box-sizing: border-box;
    background-color: var(--mo-color);
    border-bottom-left-radius: 4PX;
    border-bottom-right-radius: 4PX;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -1PX;
    color: var(--mo-demo-control-font);
    cursor: pointer;
    position: relative;
    &.control__fixed {
      position: sticky;
      bottom: 0;
      border-radius: 0 !important;
    }

    i {
      position: absolute;
      font-size: 14PX;
      transition: .3s;
      &.hovering {
        transform: translateX(-222%);
      }
    }

    > span {
      font-size: 14PX;
      transition: .3s;
      display: inline-block;
      opacity: 0;
      position: absolute;
      transform: translateX(30PX);
      &.hovering {
        transform: translateX(10px);
        opacity: 1;
      }
    }
    
    
    &:hover {
      color: var(--primary-color);
      background-color: var(--mo-demo-control-hover);
    }
  }
}
</style>