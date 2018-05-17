<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="reg of regions" :key="reg.code" class="flex-column align-items-start list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <span v-b-toggle="`reg-line-${reg.code}`" class="text flex-grow-1">{{reg.name}} [{{reg.code}}]</span>
          <div class="mr-2 count text-center">
            <region-services-count :code="reg.code"/>
          </div>
          <div class="d-flex">
            <popover-icon-region-loading :code="reg.code" class="mr-2" />
            <popover-icon-region-error :code="reg.code"/>
          </div>
        </div>
        <b-collapse :id="`reg-line-${reg.code}`">
          <b-card class="mt-2">
            <region-details :code="reg.code" />
          </b-card>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import regions from '../data/regions'
import PopoverIconRegionLoading from './popover-icon-region-loading'
import PopoverIconRegionError from './popover-icon-region-error'
import RegionServicesCount from './region-services-count'
import RegionDetails from './region-details'
export default {
  computed: {
    regions () {
      return regions.map(region => ({
        ...region
      }))
    },
    loadings () {
      return this.$store.getters['regions/loadings']
    }
  },
  methods: {

  },
  components: {
    RegionDetails,
    RegionServicesCount,
    PopoverIconRegionLoading,
    PopoverIconRegionError
  }
}
</script>

<style scoped>
.text {
  font-family: inherit;
  font-weight: 500;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
}
.count {
  width: 50px;
}
</style>
