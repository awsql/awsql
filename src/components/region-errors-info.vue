<template>
  <icon :icon="icon"
        :items="items" />
</template>

<script>
// import {keyedServices} from '../data/services'
import Icon from './info-icon'
export default {
  props: ['code'],
  computed: {
    items () {
      return this.$store.getters[`regions/${this.code}/errors`].map(l => `${l.service} ${l.collection}: ${l.error}`)
    },
    icon () {
      return this.items.length > 0 ? 'el-icon-warning region-errors-icon-non-empty' : 'el-icon-warning'
    }
  },
  components: {Icon}
}
</script>

<style>
.region-errors-icon-non-empty {
  color: red;
}
</style>
