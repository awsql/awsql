<template>
  <div class="container pt-1">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand>AWS Quick Look</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <span id="queue-length">{{$store.state.pendingLength}} / {{$store.state.queueLength}}</span>
            <b-popover target="queue-length" triggers="hover focus">
              <p class="m-0">{{$store.state.pendingLength}} AWS api queries are running</p>
              <p class="m-0">{{$store.state.queueLength}} AWS api queries are waiting</p>
            </b-popover>
          </b-nav-item>
          <b-nav-item href="https://github.com/awsql/awsql">Github</b-nav-item>
          <b-nav-item href="#" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="mt-1">
      <by-regions/>
    </div>
  </div>
</template>

<script>
import * as keyValue from '../services/keyValue'
import ByRegions from '../components/by-regions'
export default {
  name: 'main-page',
  created () {
    this.$store.dispatch('regions/loadAllData')
  },
  methods: {
    logout (evt) {
      evt.preventDefault()
      keyValue.remove('credentials')
      this.$store.commit('setCredentials', undefined)
    }
  },
  components: {ByRegions}
}
</script>
