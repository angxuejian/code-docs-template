<template>
  <div>
    <div @click="close" class="has-sidebar-mask" :class="hasSide ? 'show' : 'hide'"></div>
    <div class="sidebar" :class="{ 'has-sidebar': hasSide }">
      <mo-scrollbar scroll-y class="sidebar-wrapper">
        <div class="sidebar-item" v-for="(item, index) in sidebarArr" :key='index'>

          <template v-if="item.children">
            <p class="sidebar-item__title">{{ item.title }}</p>

            <template v-for="(s, i) in item.children" :key="i">
              <router-href :to="pathUrl(s)" :item="s">
                <span :class="['sidebar-item__link', { 'sidebar-item__selected': sidebarIndex === pathUrl(s) }]">{{ s.title }}</span>
              </router-href>
            </template>
          </template>

          <template v-else>
            <router-href :to="pathUrl(item)" :item="item">
              <span :class="['sidebar-item__title', { 'sidebar-item__title-selected': sidebarIndex === pathUrl(item) }]">{{ item.title }}</span>
            </router-href>
          </template>
        </div>
      </mo-scrollbar>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Navbar from '@/router/navbar.json'
import routerHref from './router-href.vue'
const setting = require('@/setting')
export default {
  components: { routerHref },
  setup() {
    const pathUrl = item => `/${setting.path}/${(item.path || item.name)}`

    const router = useRouter()
    const store = useStore()
    const sidebarArr = ref(Navbar)
    const sidebarIndex = computed(() => store.state.path)
    const hasSide = computed(() => store.state.hasSide)
    const close = () => { store.dispatch('CHANGE_SIDE', false) }

    const handleResize = () => { store.dispatch('CHANGE_DEVICE')}
    onMounted(() => { store.dispatch('ADD_LISTENER', handleResize) })
    onUnmounted(() => store.dispatch('DEL_LISTENER', handleResize))
    

    return { sidebarArr, sidebarIndex, hasSide, pathUrl, close }
  },
}
</script>

<style lang="scss" scoped>

%item {
  height: 40PX;
  line-height: 40PX;
  width: 100%;
}
.sidebar {
  position: fixed;
  left: 0;
  width: 27%;
  z-index: var(--sid-z-index);
  top: calc(var(--navbar-height) + 1PX);
  background-color: var(--mo-color);
  height: calc(100% - var(--navbar-height) + 1PX);
  color: var(--mo-text-primary-color);
  transform: translateX(0);
  transition: background-color .2s, opacity .25s,transform .5s cubic-bezier(.19,1,.22,1);
}

.sidebar-wrapper {
  padding-top: var(--navbar-margin);
  padding-bottom: var(--navbar-margin);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .sidebar-item {
    width: 60%;
    min-width: 200PX;
    padding-right: 10%;
    box-sizing: border-box;
    float: right;
    .sidebar-item__title {
      color: var(--mo-text-primary-color);
      font-size: 12px;
      margin-bottom: 4PX;
      @extend %item;
    }
    .sidebar-item__link {
      color: var(--mo-text-regular-color);
      font-size: 9.5px;
      border-radius: 5PX;
      display: block;
      padding: 0 10PX;
      box-sizing: border-box;
      margin-bottom: 1PX;
      @extend %item;
      &:hover {
        color: var(--primary-color)
      }
    }
    .sidebar-item__selected {
      background-color: var(--primary-color-bg) !important;
      color: var(--primary-color) !important;
      font-weight: 600;
    }
    .sidebar-item__title-selected {
      color: var(--primary-color) !important;
      font-weight: 600;
    }
  }
}

.has-sidebar {
  transform: translateX(0) !important;
  width: 70%;
  .sidebar-item {
    width: 80%;
  }
}

.has-sidebar-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: var(--sid-mask-z-index);
  transition: all 0.3s;
}
.hide {
  visibility: hidden;
  opacity: 0;
}
.show {
  opacity: 1;
  visibility: visible;
}
</style>