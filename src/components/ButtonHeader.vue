<template>
  <div class="button" @mouseenter="$emit('button-event', 'mouseenter')" @click="$emit('button-event', 'click')">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'HeaderTop',
  props: ['text']
}
</script>

<style scoped lang="scss">
.button {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;
  height: 100%;
  padding: 0 32px;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
