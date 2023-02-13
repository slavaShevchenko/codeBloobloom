import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const stateDefault = {
  loadingView: true,
  asideMenuShow: false,
  infiniteScrollDisabled: false,
  nextPage: 1,
  limitPage: 12,
  totalItems: null,
  collectionData: []
}

export default new Vuex.Store({
  state: {
    ...stateDefault,
    currentCollectionName: null,
    filterColouredData: ['black', 'tortoise', 'coloured', 'crystal', 'dark', 'bright'],
    filterShapeData: ['square', 'rectangle', 'round', 'cat-eye'],
    filterItemsColoured: [],
    filterItemsShape: [],
    filterColouredOpen: false,
    filterShapeOpen: false
  },
  getters: {
    GET_LOADING_VIEW(state) {
      return state.loadingView
    },
    GET_ASIDE_SHOW_MENU(state) {
      return state.asideMenuShow
    },
    GET_INFINITE_SCROLL_DISABLED(state) {
      return state.infiniteScrollDisabled
    },
    GET_CURRENT_COLLECTION_NAME(state) {
      return state.currentCollectionName
    },
    GET_COLLECTION_DATA(state) {
      return state.collectionData
    },
    GET_NEXT_PAGE(state) {
      return state.nextPage
    },
    GET_LIMIT_PAGE(state) {
      return state.limitPage
    },
    GET_TOTAL_ITEMS(state) {
      return state.totalItems
    },
    GET_FILTER_COLOURED_OPEN(state) {
      return state.filterColouredOpen
    },
    GET_FILTER_SHAPE_OPEN(state) {
      return state.filterShapeOpen
    },
    GET_FILTER_COLOURED_DATA(state) {
      return state.filterColouredData
    },
    GET_FILTER_SHAPE_DATA(state) {
      return state.filterShapeData
    },
    GET_FILTER_ITEMS_COLOURED(state) {
      return state.filterItemsColoured
    },
    GET_FILTER_ITEMS_SHAPE(state) {
      return state.filterItemsShape
    }
  },
  mutations: {
    SET_LOADING_VIEW(state, payload) {
      state.loadingView = payload
    },
    SET_ASIDE_SHOW_MENU(state, payload) {
      state.asideMenuShow = payload
    },
    SET_INFINITE_SCROLL_DISABLED(state, payload) {
      state.infiniteScrollDisabled = payload
    },
    SET_CURRENT_COLLECTION_NAME(state, payload) {
      state.currentCollectionName = payload
    },
    SET_COLLECTION_DATA(state, payload) {
      state.collectionData = [...state.collectionData, ...payload]
      state.infiniteScrollDisabled = false
    },
    SET_TOTAL_ITEMS(state, payload) {
      state.totalItems = payload
    },
    INCREASE_NEXT_PAGE(state) {
      state.nextPage++
    },
    CLEAN_UP(state) {
      Object.assign(state, stateDefault)
    },
    SET_FILTER_COLOURED_OPEN(state, payload) {
      state.filterColouredOpen = payload
    },
    SET_FILTER_SHAPE_OPEN(state, payload) {
      state.filterShapeOpen = payload
    },
    SET_FILTER_ITEMS_COLOURED(state, payload) {
      state.filterItemsColoured = payload
    },
    SET_FILTER_ITEMS_SHAPE(state, payload) {
      state.filterItemsShape = payload
    }
  }
})
