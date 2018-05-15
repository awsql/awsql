<template>
  <el-popover width="350"
              trigger="hover"
              :disabled="disabled"
  >
    <slot></slot>
    <i slot="reference" :class="icon" @click="click"></i>
  </el-popover>
</template>

<script>
export default {
  props: {
    icon: {},
    disabled: {}
  },
  computed: {

  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.icon-button {
  border-radius: 50%;
  padding: 8px;
  font-size: 12px;
  outline: none;
}
</style>
