<template>
  <div class="main-wrapper">

    <sidebar />
    <menubar />

    <div class="view">
      <div class="view-wrapper">
        <router-view />
      </div>
      <!-- <div class="toc-wrapper"></div> -->
    </div>

  </div>
</template>


<script>
import sidebar from './sidebar.vue'
import menubar from './menubar.vue'
export default {
  name: 'Layout',
  components: { sidebar, menubar },

  mounted () {
  },
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.view {
  padding-top: var(--navbar-margin);
  width: 100%;
  box-sizing: border-box;
  padding-left: calc(var(--sidebar-width) + 3%);
  display: flex;
  align-items: flex-start;
  .view-wrapper {
    width: 70%;
    padding: 25PX 0;
    box-sizing: border-box;
  }
}
</style>