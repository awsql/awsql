<template>
  <div>
    <table width="50%">
      <tr v-for="sc of services" :key="sc.text">
        <td>{{sc.text}}</td>

        <td width="50px">
          <service-count :region="code"
                         :service="sc.service"
                         :collection="sc.collection"
          />
          <service-data-provider :region="code"
                                 :service="sc.service"
                                 :collection="sc.collection"
          >
            <span slot-scope="info" v-if="info.loading" class="el-icon-loading"></span>
          </service-data-provider>
          <service-data-provider :region="code"
                                 :service="sc.service"
                                 :collection="sc.collection"
          >
            <info-icon slot-scope="info" icon="el-icon-warning">
              <span>{{info.error.toString()}}</span>
            </info-icon>
          </service-data-provider>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import services from '../data/services'
import InfoIcon from './info-icon'
import ServiceCount from './service-count'
import ServiceDataProvider from './service-data-provider'
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
    ServiceCount,
    ServiceDataProvider,
    InfoIcon
  }
}
</script>
