<template>
  <span>[ {{count}} ]</span>
</template>

<script>
export default {
  props: ['code'],
  computed: {
    count () {
      return this.$store.getters[`regions/${this.code}/count`]
    }
  }
}
</script>
