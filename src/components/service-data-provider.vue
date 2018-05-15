<template>
  <component :is="tagName">
    <slot v-bind="info"></slot>
  </component>
</template>

<script>
export default {
  // props: ['region', 'service', 'collection'],
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
      return this.$store.state.regions[this.region][this.service][this.collection]
    }
  }
}
</script>
