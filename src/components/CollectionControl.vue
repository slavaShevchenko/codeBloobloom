<template>
  <div class="control">
    <div class="control__side"></div>
    <div class="control__header">
      <span>{{ GET_CURRENT_COLLECTION_NAME && GET_CURRENT_COLLECTION_NAME.replace(/-/g, ' ') }}</span>
    </div>
    <div class="control__side">
      <div class="control__buttons" v-click-outside="hideFilters">
        <div class="control__buttons-item" @mouseleave="handlerLeaveEventColour">
          <ButtonHeader text="colour" @button-event="handlerButtonEventColour" />
          <MultiSelect
            :open="GET_FILTER_COLOURED_OPEN"
            :data="GET_FILTER_COLOURED_DATA"
            @checked-items="setColouredItems"
          />
        </div>
        <div class="control__buttons-item" @mouseleave="handlerLeaveEventShape">
          <ButtonHeader text="shape" @button-event="handlerButtonEventShape" />
          <MultiSelect :open="GET_FILTER_SHAPE_OPEN" :data="GET_FILTER_SHAPE_DATA" @checked-items="setShapeItems" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ClickOutside from 'vue-click-outside'
import ButtonHeader from '@/components/ButtonHeader.vue'
import MultiSelect from '@/components/MultiSelect.vue'

export default {
  name: 'CollectionControl',
  components: {
    ButtonHeader,
    MultiSelect
  },
  directives: {
    ClickOutside
  },
  methods: {
    ...mapMutations([
      'SET_FILTER_COLOURED_OPEN',
      'SET_FILTER_SHAPE_OPEN',
      'SET_FILTER_ITEMS_COLOURED',
      'SET_FILTER_ITEMS_SHAPE'
    ]),
    handlerButtonEventColour(param) {
      if (window.innerWidth <= 1024) {
        if (param === 'click') {
          this.SET_FILTER_COLOURED_OPEN(true)
        }
      } else {
        if (param === 'mouseenter') {
          this.SET_FILTER_COLOURED_OPEN(true)
        }
      }
    },
    handlerLeaveEventColour() {
      if (window.innerWidth > 1024) {
        this.SET_FILTER_COLOURED_OPEN(false)
      }
    },
    handlerButtonEventShape(param) {
      if (window.innerWidth <= 1024) {
        if (param === 'click') {
          this.SET_FILTER_SHAPE_OPEN(true)
        }
      } else {
        if (param === 'mouseenter') {
          this.SET_FILTER_SHAPE_OPEN(true)
        }
      }
    },
    handlerLeaveEventShape() {
      if (window.innerWidth > 1024) {
        this.SET_FILTER_SHAPE_OPEN(false)
      }
    },
    setColouredItems(items) {
      this.SET_FILTER_ITEMS_COLOURED(items)
    },
    setShapeItems(items) {
      this.SET_FILTER_ITEMS_SHAPE(items)
    },
    hideFilters() {
      this.GET_FILTER_COLOURED_OPEN && this.SET_FILTER_COLOURED_OPEN(false)
      this.GET_FILTER_SHAPE_OPEN && this.SET_FILTER_SHAPE_OPEN(false)
    }
  },
  computed: {
    ...mapGetters([
      'GET_CURRENT_COLLECTION_NAME',
      'GET_FILTER_COLOURED_OPEN',
      'GET_FILTER_SHAPE_OPEN',
      'GET_FILTER_COLOURED_DATA',
      'GET_FILTER_SHAPE_DATA'
    ])
  }
}
</script>

<style scoped lang="scss">
.control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 60px;
  border-bottom: 1px solid #000;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    border-right: 1px solid #000;
    font-weight: 700;
    font-size: 30px;
    text-transform: uppercase;
    text-align: center;
  }

  &__side:first-child {
    border-right: 1px solid #000;
  }

  &__buttons {
    display: flex;
    width: 320px;
    height: 100%;

    &-item {
      flex: 0 0 50%;
      border-right: 1px solid #000;
      position: relative;

      &::v-deep .button {
        display: flex;
      }
    }
  }
}

@media (max-width: 1318px) {
  .control {
    &__header {
      font-size: 16px;
    }
  }
}
@media (max-width: 1024px) {
  .control {
    display: block;
    height: auto;

    &__side:first-child {
      display: none;
    }

    &__header {
      height: 40px;
      border-bottom: 1px solid #000;
    }

    &__buttons {
      width: 100%;
      height: 40px;

      &-item {
      }
    }
  }
}
</style>
