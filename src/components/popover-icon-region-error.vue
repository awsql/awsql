<template>
  <icon icon="exclamation-circle"
        :disabled="!items.length"
        :class="items.length && 'text-danger'"
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
      return this.$store.getters[`regions/${this.code}/errors`].map(l => {
        const service = keyedServices[l.service].name
        const collection = keyedServices[l.service].collections[l.collection].name
        return `${service} ${collection}: ${l.error}`
      })
    }
  },
  components: {Icon}
}
</script>
