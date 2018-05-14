<template>
  <div>
    <table width="50%">
      <tr v-for="sc of services" :key="sc.text">
        <td>{{sc.text}}</td>

        <td>
          <service-count :region="code"
                         :service="sc.service"
                         :collection="sc.collection"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import services from '../data/services'
import ServiceCount from './service-count'
export default {
  props: ['code'],
  computed: {
    services () {
      const result = []
      for (const s of services) {
        for (const c of s.collections) {
          result.push({
            service: s.code,
            collection: c.code,
            text: `${s.name} ${c.name}`
          })
        }
      }
      return result
    }
  },
  components: {
    ServiceCount
  }
}
</script>
