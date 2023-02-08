<template>
  <router-link v-if="!item.link" :to="to">
    <slot></slot>
  </router-link>
  <a v-else target="_blank" :href="item.path">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    to: {
      type: String,
      default: () => ''
    }
  }
}
</script>