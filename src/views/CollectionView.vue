<template>
  <div class="collection">
    <div class="collection__grid">
      <template v-for="item in GET_COLLECTION_DATA">
        <CollectionCard :key="item.id" :item="item" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionCard from '@/components/CollectionCard'

export default {
  name: 'CollectionView',
  data() {
    return {
      loading: false
    }
  },
  components: {
    CollectionCard
  },
  computed: {
    ...mapGetters(['GET_COLLECTION_DATA'])
  }
}
</script>

<style scoped lang="scss">
.collection {
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1318px) {
  .collection {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
@media (max-width: 719px) {
  .collection {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
