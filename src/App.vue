<template>
  <application v-if="$store.state.credentials">logged</application>
  <login v-else/>
</template>

<script>
import Application from './views/Application'
import Login from './views/Login'
export default {
  components: {Application, Login}
}
</script>

<style>
body {
  margin: 0
}
</style>
