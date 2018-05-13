<template>
  <div>
    <el-table :data="regions" style="width: 100%">
      <el-table-column label="Region">
        <template slot-scope="scope">
          {{scope.row.name}} ({{scope.row.code}})
        </template>
      </el-table-column>
      <el-table-column label="Services count">
        <template slot-scope="scope">
          [ {{scope.row.count}} ]
        </template>
      </el-table-column>
      <el-table-column label="Info">
        <template slot-scope="scope">
          <region-loadings-info :code="scope.row.code"/>
          <region-errors-info :code="scope.row.code"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import regions from '../data/regions'
import RegionLoadingsInfo from './region-loadings-info'
import RegionErrorsInfo from './region-errors-info'
export default {
  computed: {
    regions () {
      return regions.map(region => ({
        ...region,
        count: this.$store.getters[`regions/${region.code}/count`]
      }))
    },
    loadings () {
      return this.$store.getters['regions/loadings']
    }
  },
  methods: {

  },
  components: {RegionLoadingsInfo, RegionErrorsInfo}
}
</script>
