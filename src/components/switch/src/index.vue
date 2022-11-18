<template>
  <div>
    <div 
    @click="switchStatus"
    :class="{
      'switch': !theme,
      'switch__theme': theme,
      'switch__checked': checked,
      'switch__checked--color': !theme && checked
    }
    ">
      <div v-if="theme" class="pointer">
        <i :class="['iconfont', `icon-${checked ? 'moon' : 'sun'}`]" />
      </div>
    </div>

  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'MoSwitch',
  props: {
    theme: {
      type: Boolean,
      default: () => false,
    },
    modelValue: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const store = useStore()
    const t = computed(() => store.state.theme)
    const checked = computed({
      get: () => {
        return props.theme ? Boolean(t.value) : props.modelValue
      },
      set: (value) => {
        emit('update:modelValue', value)
      },
    })


    const switchStatus = () => {
      checked.value = !checked.value
      emit('change', { value: checked.value })      
    }
    watch(t, (newV) => { checked.value = Boolean(newV) })
    
    return { checked, switchStatus }
  },
}
</script>

<style lang="scss" scoped>
$color: var(--mo-text-light-color);
%pointer {
  position: absolute;
  top: calc((100% - 16PX) / 2);
  left: 1px;
  width: 16PX;
  height: 16PX;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgb(0 0 0 / 40%);
  transition: all 0.3s;
  transform: scale(1);
}
.switch, .switch__theme {
  width: 41PX;
  height: 21PX;
  background-color: $color;
  border-radius: 16PX;
  cursor: pointer;
  border: 1px solid $color;
  display: inline-block;
  box-sizing: border-box;
  transition: all 0.3s;
  position: relative;
  &:hover {
    border-color: var(--mo-text-hover-color) !important;
  }
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color;
    border-radius: 15PX;
    transition: all 0.3s;
  }
}

.switch {
  &::after {
    content: '';
    background-color: #FFFFFF;
    @extend %pointer;
  }
}
.switch__theme {
  .pointer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--mo-color);
    @extend %pointer;
  }
}
.switch__checked {
  &::before {
    transform: scale(0);
  }
  .pointer, &::after {
    transform: scale(0.98) translateX(21PX);
  }
}
.switch__checked--color {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>