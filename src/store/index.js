import { createStore } from 'vuex';

export default createStore({
  state: {
    path: '/',         // 当前页面的 path
    theme: '',         // 默认为空(白)，dark(黑)
    hasSide: false,    // 是否显示侧边栏(mobile才会有)
    device: 'desktop', // desktop or mobile
  },
  mutations: {
    SET_PATH: (state, value) => { state.path = value },
    SET_THEME: (state, value) => { state.theme = value },
    SET_SIDE: (state, value) => { state.hasSide = value },
    SET_DEVICE: (state, value) => { state.device = value },
  },
  actions: {
    CHANGE_PATH: function(context, value) {
      context.commit('SET_PATH', value)
      if (context.state.device === 'desktop') context.commit('SET_SIDE', false)
    },
    CHANGE_THEME: function(context) {
      if (!context.state.theme) {
        document.documentElement.setAttribute('theme', 'dark')
        context.commit('SET_THEME', 'dark')
      } else {
        document.documentElement.removeAttribute('theme')
        context.commit('SET_THEME', '')
      }
    },

    CHANGE_SIDE: function(context, value) {
      context.commit('SET_SIDE', value)
    },

    CHANGE_DEVICE: function(context) {
      const width = document.documentElement.clientWidth

      // mobile设备最大宽度为950, screen.scss也存在
      const value = width <= 950 ? 'mobile' : 'desktop'
      context.commit('SET_DEVICE', value)

      if (value === 'desktop') context.commit('SET_SIDE', false)
    },

    ADD_LISTENER: function(context, func) {
      window.addEventListener('resize', func)
    },
    DEL_LISTENER: function(context, func) {
      window.removeEventListener('resize', func)
    },
  },
  modules: {},
});

