<template>
  <div id="app">
    <SidebarMenu />
    <HeaderTop />
    <CollectionControl />
    <div v-infinite-scroll="buildUp" infinite-scroll-disabled="GET_INFINITE_SCROLL_DISABLED">
      <router-view />
    </div>
    <AnimationLoader v-if="GET_LOADING_VIEW" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SidebarMenu from '@/components/SidebarMenu.vue'
import HeaderTop from '@/components/HeaderTop.vue'
import CollectionControl from '@/components/CollectionControl.vue'
import AnimationLoader from '@/components/AnimationLoader.vue'

const API_URL = 'https://api.bloobloom.com/user/v1/sales_channels/website/collections/'

export default {
  data() {
    return {
      request: null
    }
  },
  components: {
    SidebarMenu,
    HeaderTop,
    AnimationLoader,
    CollectionControl
  },
  methods: {
    ...mapMutations([
      'SET_LOADING_VIEW',
      'SET_INFINITE_SCROLL_DISABLED',
      'SET_CURRENT_COLLECTION_NAME',
      'SET_COLLECTION_DATA',
      'INCREASE_NEXT_PAGE',
      'SET_TOTAL_ITEMS',
      'CLEAN_UP'
    ]),
    async fetchGlasses(signal) {
      this.SET_INFINITE_SCROLL_DISABLED(true)

      const url = `${API_URL}${this.GET_CURRENT_COLLECTION_NAME}/glasses?page[limit]=${
        this.GET_LIMIT_PAGE
      }&page[number]=${
        this.GET_NEXT_PAGE
      }${this.getFilterItemsColoured()}${this.getFilterItemsShape()}&sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[frame_variant_home_trial_available]=false`

      const response = await fetch(url, { signal })
      const payload = await response.json()

      return payload
    },
    buildUp() {
      if (!this.checkLastPage()) {
        if (this.request) {
          this.request.abort()
        }
        this.request = new AbortController()

        this.fetchGlasses(this.request.signal).then((payload) => {
          this.SET_TOTAL_ITEMS(payload.meta.total_count)
          this.INCREASE_NEXT_PAGE()
          this.SET_COLLECTION_DATA(payload.glasses)
          this.checkLastPage() && this.SET_LOADING_VIEW(false)
        })
      }
    },
    getCurrentCollectionName() {
      this.SET_CURRENT_COLLECTION_NAME(this.$route.name)
    },
    getFilterItemsColoured() {
      const colouredItems = this.GET_FILTER_ITEMS_COLOURED.map((item) => {
        return '&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=' + item
      }).join('')

      return colouredItems
    },
    getFilterItemsShape() {
      const shapeItems = this.GET_FILTER_ITEMS_SHAPE.map((item) => {
        return '&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=' + item
      }).join('')

      return shapeItems
    },
    newData() {
      this.CLEAN_UP()
      this.buildUp()
    },
    checkLastPage() {
      return this.GET_TOTAL_ITEMS && this.GET_NEXT_PAGE > Math.ceil(this.GET_TOTAL_ITEMS / this.GET_LIMIT_PAGE)
    }
  },
  beforeMount() {
    this.getCurrentCollectionName()
  },
  computed: {
    ...mapGetters([
      'GET_LOADING_VIEW',
      'GET_INFINITE_SCROLL_DISABLED',
      'GET_CURRENT_COLLECTION_NAME',
      'GET_NEXT_PAGE',
      'GET_LIMIT_PAGE',
      'GET_TOTAL_ITEMS',
      'GET_FILTER_ITEMS_COLOURED',
      'GET_FILTER_ITEMS_SHAPE'
    ])
  },
  watch: {
    '$route.path'() {
      this.getCurrentCollectionName()
      this.newData()
    },
    GET_FILTER_ITEMS_COLOURED() {
      this.newData()
    },
    GET_FILTER_ITEMS_SHAPE() {
      this.newData()
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Plantin';
  src: url('~@/assets/fonts/Plantin.woff2') format('woff2'), url('~@/assets/fonts/Plantin.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

*,
*:after,
*:before {
  box-sizing: border-box;
}
body {
  margin: 0;
}
img {
  display: block;
}
#app {
  font-family: 'Plantin';
  color: #000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

#infiniti {
  min-height: 100vh;
}
.footer {
  height: 100px;
}
</style>
