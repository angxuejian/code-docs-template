<template>
  <div>
    <div class="navbar">
      <div class="navbar-wrapper">
        
        <a class="logo" href="#" :alt='`${title} Logo`'>
          <div></div><span>{{ title }}</span>
        </a>
       
        <div class="header-wrapper">
          <div class="sub-pages">
            <router-link :class="['page-item', { 'page-item__selected': selectSubPageIndex === index }]" v-for="(item, index) in subPages" :key="index" :to="item.url">
              <span @click="getSubPage(index)">{{ item.name }}</span>
            </router-link>
          </div>
          
          <div class="theme-switch">
            <mo-switch theme @change='onCallbackSwitchChange' />
          </div>
          <a :alt='github.alt' :href="github.href">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github mo-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>

      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const setting = require('./setting')
export default {
  name: 'APP',
  
  setup() {
    const store = useStore()
    const subPages = ref([
      { name: '文档', url: '/' },
    ])

    const selectSubPageIndex = ref(0)
    const getSubPage = index => { selectSubPageIndex.value = index }
    const onCallbackSwitchChange = () => { store.dispatch('CHANGE_THEME') }

    const title = setting.title
    const github = setting.github
    
    return { github, title, subPages, selectSubPageIndex, getSubPage, onCallbackSwitchChange }
  },
}
</script>

<style lang="scss">
#nprogress .bar {
  background: var(--primary-color) !important;
}
html, body {
  width: 100%;
  height: 100%;
}
html, body, #app {
  padding: 0;
  margin: 0;
}
body {
  -webkit-tap-highlight-color: transparent
}

#app {
  background-color: var(--mo-color);
  color: var(--mo-text-regular-color);
  box-sizing: border-box;
  transition: background-color 0.3s;
  min-height: 100%;
  min-width: 100%;
}
.navbar {
  width: 100%;
  background-color: var(--mo-color);
  border-bottom: 1px solid var(--mo-text-hover-color);
  position: sticky;
  top: 0;
  z-index: var(--men-z-index);
  .navbar-wrapper {
    height: var(--navbar-height);
    max-width: 90%;
    margin: 0 auto;
    padding: 0 5%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      height: 100%;
      div {
        background: var(--mo-logo) no-repeat;
        background-size: 100% 100%;
        width: 30PX;
        height: 30PX;
        margin-right: 3px;
      }
      span {
        font-size: var(--fs-logo);
        color: var(--mo-text-primary-color)
      }
    }

    .header-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .sub-pages {
        height: 100%;
        display: flex;
        align-items: center;
        .page-item {
          height: 100%;
          padding: 0 12PX;
          display: inline-block;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border-bottom: 2px solid transparent;
          span {
            font-size: 10px;
            color: var(--mo-text-primary-color);
            &:hover {
              color: var(--primary-color)
            }
          }
        }
        .page-item__selected {
          box-sizing: border-box;
          border-bottom-color: var(--primary-color);
        }
      }

      .theme-switch {
        margin: 0 30PX;
      }
      .mo-github {
        color: var(--mo-text-primary-color);
        width: 20PX;
        height: 20PX;
      }
    }
  }
}
</style>
