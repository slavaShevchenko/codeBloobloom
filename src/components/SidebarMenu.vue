<template>
  <div
    class="menu"
    @mouseleave="handlerSideMenuLeave"
    @mouseenter="handlerSideMenuEnter"
    :class="{ 'menu--open': GET_ASIDE_SHOW_MENU }"
  >
    <div class="menu__wrapper">
      <div class="menu__item" @mouseenter="handlerMenuItemSpec('enter')" @click="handlerMenuItemSpec('click')">
        <div class="menu__item-text">spectacles</div>
        <div class="menu__item-arrow"></div>
      </div>
      <div class="menu__item" @mouseenter="handlerMenuItemSun('enter')" @click="handlerMenuItemSun('click')">
        <div class="menu__item-text">sunglasses</div>
        <div class="menu__item-arrow"></div>
      </div>
      <div class="menu__item" @mouseenter="handlerMenuSectionNull">
        <div class="menu__item-text">home try on</div>
      </div>
      <div class="menu__item" @mouseenter="handlerMenuSectionNull">
        <div class="menu__item-text">pair for pair</div>
      </div>
    </div>
    <div class="menu__second" :class="{ 'menu__second--open': section }" @mouseleave="handlerMenuSectionNull">
      <template v-if="section === 'spectacles'">
        <router-link class="menu__second-item" to="/spectacles-women">women</router-link>
        <router-link class="menu__second-item" to="/spectacles-men">men</router-link>
      </template>
      <template v-else-if="section === 'sunglasses'">
        <router-link class="menu__second-item" to="/sunglasses-women">women</router-link>
        <router-link class="menu__second-item" to="/sunglasses-men">men</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SidebarMenu',
  data() {
    return {
      section: null
    }
  },
  methods: {
    ...mapMutations(['SET_ASIDE_SHOW_MENU']),
    handlerSideMenuLeave() {
      if (window.innerWidth > 1024) {
        this.SET_ASIDE_SHOW_MENU(false)
      }
    },
    handlerSideMenuEnter() {
      if (window.innerWidth > 1024) {
        this.SET_ASIDE_SHOW_MENU(true)
      }
    },
    handlerMenuItemSpec(type) {
      if ((window.innerWidth > 1024 && type === 'enter') || (window.innerWidth <= 1024 && type === 'click')) {
        this.section = 'spectacles'
      }
    },
    handlerMenuItemSun(type) {
      if ((window.innerWidth > 1024 && type === 'enter') || (window.innerWidth <= 1024 && type === 'click')) {
        this.section = 'sunglasses'
      }
    },
    handlerMenuSectionNull() {
      if (window.innerWidth > 1024) {
        this.section = null
      }
    }
  },
  computed: {
    ...mapGetters(['GET_ASIDE_SHOW_MENU'])
  },
  watch: {
    GET_ASIDE_SHOW_MENU(newValue) {
      if (!newValue) {
        this.section = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  width: 220px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 60px;
  z-index: 100;
  transform: translate(-100%, 0);
  transition: transform 400ms ease;

  &--open {
    transform: translate(0, 0);
  }

  &__wrapper {
    height: calc(100% - 60px);
    background-color: #fff;
    border-right: 1px solid #000;
    position: relative;
    z-index: 10;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 66px;
    padding: 0 20px;
    border-bottom: 1px solid #000;
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
    cursor: pointer;

    &-arrow {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-left: 6px solid #002fa7;
      border-bottom: 6px solid transparent;
    }

    &:hover {
      background-color: #000;

      .menu__item-text {
        color: #fff;
      }
      .menu__item-arrow {
        border-left: 6px solid #fff;
      }
    }
  }

  &__second {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #000;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transform: translate(0, 0);
    transition: transform 400ms ease;

    &--open {
      transform: translate(100%, 0);
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 66px;
      padding: 0 20px;
      border-bottom: 1px solid #000;
      font-size: 12px;
      line-height: 1;
      color: #000;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
@media (max-width: 1024px) {
  .menu {
    width: 50%;
    top: 40px;

    &__wrapper {
      height: calc(100% - 40px);
    }
  }
}
</style>
