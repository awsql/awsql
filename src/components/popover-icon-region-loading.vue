<template>
  <icon :icon="icon"
        :disabled="!items.length"
        :spin="items.length"
        :class="!items.length && 'text-primary'"
        @click="click"
  >
    <div v-for="(item, idx) of items" :key="item" :class="idx && 'mt-2'">
      {{item}}
    </div>
  </icon>
</template>

<script>
import {keyedServices} from '../data/services'
import Icon from './popover-icon'
export default {
  props: ['code'],
  computed: {
    items () {
      return this.$store.getters.regionLoadings(this.code).map(l => {
        const service = keyedServices[l.service].name
        const collection = keyedServices[l.service].collections[l.collection].name
        return `Loading ${service} ${collection}`
      })
    },
    icon () {
      return this.items.length < 1 ? 'sync-alt' : 'spinner'
    }
  },
  methods: {
    click () {
      if (!this.items.length) {
        this.$store.dispatch('resetRegionData', this.code)
        this.$store.dispatch('loadRegionData', this.code)
      }
    }
  },
  components: {Icon}
}
</script>
