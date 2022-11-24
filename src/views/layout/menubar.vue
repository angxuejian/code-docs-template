<template>
  <div class="menubar">

    <i @click="openSide" class="iconfont icon-icon_menu_open menu" />

    <div></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const openSide = () => { store.dispatch('CHANGE_SIDE', true)}
    return { openSide }
  },
}
</script>
<style lang="scss" scoped>

.menubar {
  position: fixed;
  top: calc(var(--navbar-height) + 1PX);
  left: 0%;
  padding: 0 5%;
  box-sizing: border-box;
  width: 100%;
  height: 48PX;
  background-color: var(--mo-color);
  border-bottom: 1px solid var(--mo-text-hover-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: none;
  z-index: var(--men-z-index);
  .menu {
    font-size: 20PX;
    display: block;
    cursor: pointer;
  }
}
</style>