<template>
  <icon :icon="icon"
        :disabled="!items.length"
        @click="click"
  >
    <div v-for="i of items" :key="i">
      {{i}}
    </div>
  </icon>
</template>

<script>
// import {keyedServices} from '../data/services'
import Icon from './info-icon'
export default {
  props: ['code'],
  computed: {
    items () {
      return this.$store.getters[`regions/${this.code}/loadings`].map(l => `Loading ${l.service} ${l.collection}`)
    },
    icon () {
      return this.items.length < 1 ? 'el-icon-refresh region-loadings-icon-empty' : 'el-icon-loading'
    }
  },
  methods: {
    click () {
      if (!this.items.length) {
        this.$store.dispatch('regions/resetRegionData', this.code)
        this.$store.dispatch('regions/loadRegionData', this.code)
      }
    }
  },
  components: {Icon}
}
</script>

<style>
.region-loadings-icon-empty {
  cursor: pointer;
  color: blue;
}
</style>
