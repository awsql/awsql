<template>
  <div>
    <el-menu :default-active="menuIdx" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="logo">AWS Quick Look</el-menu-item>
      <el-menu-item index="github"><a href="https://github.com/awsql/awsql">Github</a></el-menu-item>
      <el-menu-item index="logout">Logout</el-menu-item>
    </el-menu>
    <div class="content">
      <awsql/>
    </div>
  </div>
</template>

<script>
import * as keyValue from '../services/keyValue'
import Awsql from '../components/awsql'
export default {
  name: 'main-page',
  data () {
    return {
      menuIdx: 'logo'
    }
  },
  created () {
    this.$store.dispatch('regions/loadAllData')
  },
  methods: {
    handleSelect (idx) {
      if (idx === 'logout') {
        keyValue.remove('credentials')
        this.$store.commit('setCredentials', undefined)
      }
    }
  },
  components: {Awsql}
}
</script>

<style lang="less">
.content {
  padding: 6px;
}
</style>
