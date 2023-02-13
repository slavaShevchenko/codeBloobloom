<template>
  <div class="header">
    <div class="header__side">
      <ButtonHeader :text="textForButton()" @button-event="handlerButtonEvent" />
      <div class="header__button-shadow" @mouseenter="handlerButtonShadow"></div>
    </div>
    <div class="header__logo">
      <router-link to="/">
        <img alt="Logo" src="../assets/logo.png" />
      </router-link>
    </div>
    <div class="header__side"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ButtonHeader from '@/components/ButtonHeader.vue'

export default {
  name: 'HeaderTop',
  components: {
    ButtonHeader
  },
  methods: {
    ...mapMutations(['SET_ASIDE_SHOW_MENU']),
    handlerButtonEvent(eventType) {
      if (window.innerWidth <= 1024) {
        if (eventType === 'click') {
          if (this.GET_ASIDE_SHOW_MENU) {
            this.SET_ASIDE_SHOW_MENU(false)
          } else {
            this.SET_ASIDE_SHOW_MENU(true)
          }
        }
      } else {
        if (eventType === 'mouseenter') {
          this.SET_ASIDE_SHOW_MENU(true)
        }
      }
    },
    handlerButtonShadow() {
      if (window.innerWidth > 1024) {
        this.SET_ASIDE_SHOW_MENU(false)
      }
    },
    textForButton() {
      if (window.innerWidth > 1024) {
        return 'menu'
      } else {
        return this.GET_ASIDE_SHOW_MENU ? 'X' : 'menu'
      }
    }
  },
  computed: {
    ...mapGetters(['GET_ASIDE_SHOW_MENU'])
  }
}
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  column-gap: 16px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #000;
  position: sticky;
  top: 0;
  z-index: 110;

  &__side {
    display: flex;
  }

  &__button-shadow {
    flex: 1 0 auto;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 1024px) {
  .header {
    height: 40px;
  }
}
</style>
