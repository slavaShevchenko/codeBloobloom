<template>
  <div class="loader">
    <div class="loader__text">Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'AnimationLoader'
}
</script>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;

  &__text {
    opacity: 1;
    font-size: 20px;
    line-height: 1;
    text-transform: uppercase;
    animation: loadingAnimation 1s linear infinite;
  }
}

@keyframes loadingAnimation {
  50% {
    opacity: 0.1;
  }
}
</style>
