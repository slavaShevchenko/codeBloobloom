<template>
  <div class="multiselect" v-show="open">
    <div v-for="(item, index) in data" :key="item" class="multiselect__item">
      <input
        type="checkbox"
        :id="'checkbox' + item + index"
        :value="item"
        @change="dataRefresh()"
        class="multiselect__item-input"
      />
      <label :for="'checkbox' + item + index" class="multiselect__item-label">{{ item }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSelect',
  props: ['open', 'data'],
  data() {
    return {
      checkedItems: null
    }
  },
  methods: {
    dataRefresh() {
      const checkboxes = this.$el.querySelectorAll('input[type="checkbox"]:checked')
      const values = []
      for (let i = 0; i < checkboxes.length; i++) {
        values.push(checkboxes[i].value)
      }
      this.$emit('checked-items', values)
    }
  }
}
</script>

<style scoped lang="scss">
.multiselect {
  width: calc(100% + 2px);
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #000;
  position: absolute;
  left: -1px;
  top: 100%;
  z-index: 10;

  &__item {
    &-input {
      display: none;
      opacity: 0;
      visibility: hidden;
    }

    &-label {
      display: block;
      padding: 5px 0 5px 26px;
      font-size: 14px;
      line-height: 1;
      text-transform: uppercase;
      position: relative;
      cursor: pointer;

      &:before {
        content: '';
        width: 16px;
        height: 16px;
        border: 1px solid #ccc;
        position: absolute;
        left: 0;
        top: 5px;
      }

      &:after {
        content: '';
        opacity: 0;
        width: 8px;
        height: 8px;
        background-color: #002fa7;
        position: absolute;
        left: 4px;
        top: 9px;
      }
    }

    &-input:checked + &-label {
      &:before {
        border: 1px solid #000;
      }
      &:after {
        opacity: 1;
      }
    }
  }
}
</style>
