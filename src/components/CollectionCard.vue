<template>
  <div class="card">
    <div class="card__wrap-image">
      <img
        @load="imageLoaded = true"
        :src="item.glass_variants[0].media[0].url"
        alt="Card image"
        class="card__image"
        :class="{ 'card__image--load': imageLoaded }"
      />
    </div>
    <div class="card__name">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionCard',
  props: {
    item: Object
  },
  data() {
    return {
      imageLoaded: false
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  position: relative;

  &:nth-child(3n + 3) {
    border-right: none;
  }

  &__wrap-image {
    min-height: 33vh;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  &__image {
    opacity: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.4s ease;

    &--load {
      opacity: 1;
    }
  }

  &__name {
    width: 100%;
    font-size: 22px;
    text-transform: uppercase;
    text-align: center;
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 5;
  }
}

@media (max-width: 1318px) {
  .card {
    &:nth-child(3n + 3) {
      border-right: 1px solid #000;
    }
    &:nth-child(2n + 2) {
      border-right: none;
    }
    &__name {
      font-size: 18px;
    }
  }
}
@media (max-width: 719px) {
  .card {
    border-right: none !important;

    &__wrap-image {
      min-height: 20vh;
    }
    &__name {
      font-size: 16px;
      top: 20px;
    }
  }
}
</style>
