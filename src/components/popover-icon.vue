<template>
  <component :is="tag">
    <span class="fa" :class="iconClass" :id="htmlId" @click="$emit('click')" />
    <b-popover :target="htmlId" triggers="hover focus">
      <slot></slot>
    </b-popover>
  </component>
</template>

<script>
let id = 0
export default {
  props: {
    tag: {
      default: 'div'
    },
    icon: {
      required: true
    },
    spin: {},
    htmlId: {
      default: () => `popover-icon-${id++}`
    }
  },
  computed: {
    iconClass () {
      return {
        [`fa-${this.icon}`]: true,
        'fa-spin': this.spin
      }
    }
  }
}
</script>

<style>
.popover {
  max-width: 350px
}
</style>
