<template>
  <component :is="tagName">
    <slot v-bind="info"></slot>
  </component>
</template>

<script>
export default {
  props: {
    tagName: {
      default: 'span'
    },
    region: {},
    service: {},
    collection: {}
  },
  computed: {
    info () {
      return this.$store.getters.collItem(this.region, this.service, this.collection)
    }
  }
}
</script>
