<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEventStore } from '../stores/eventStore'
import { useFavoriteStore } from '../stores/favoriteStore'

import EventCard from '../components/EventCard.vue'
import SearchBox from '../components/SearchBox.vue'

const route = useRoute()
const eventStore = useEventStore()
const favoriteStore = useFavoriteStore()

// URLから検索条件を取得
const keyword = computed(() => route.query.keyword || '')
const genre = computed(() => route.query.genre || '')
const prefecture = computed(() => route.query.prefecture || '')

// ソート順
const sortBy = computed({
  get: () => route.query.sort || 'date',
  set: (value) => {
    // URLにソート順を反映
    window.history.replaceState({}, '', `?${new URLSearchParams({
      ...route.query,
      sort: value
    }).toString()}`)
  }
})

// 絞り込み処理
const filteredEvents = computed(() => {
  return eventStore.events.filter(event => {

    // キーワード（タイトル・会場名でマッチ）
    if (keyword.value) {
      const kw = keyword.value.toLowerCase()
      const title = event.title.rendered.toLowerCase()
      const venue = event.acf?.venue?.toLowerCase() || ''
      if (!title.includes(kw) && !venue.includes(kw)) return false
    }

    // ジャンル一致
    if (genre.value && event.acf?.genre != genre.value) {
      return false
    }

    // 都道府県一致
    if (prefecture.value && event.acf?.prefecture !== prefecture.value) {
      return false
    }

    return true
  })
})

// ソート処理
const sortedEvents = computed(() => {
  let list = [...filteredEvents.value]

  if (sortBy.value === 'date') {
    list.sort((a, b) => new Date(a.acf?.event_date) - new Date(b.acf?.event_date))
  }

  if (sortBy.value === 'new') {
    list.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  if (sortBy.value === 'fav') {
    list.sort((a, b) => {
      const aFav = favoriteStore.favorites.includes(a.id) ? 1 : 0
      const bFav = favoriteStore.favorites.includes(b.id) ? 1 : 0
      return bFav - aFav
    })
  }

  return list
})
</script>

<template>
  <div class="container">

    <!-- 検索ボックス -->
    <SearchBox />

    <!-- ソートセレクト -->
    <div class="sort">
      <label>ソート：</label>
      <select v-model="sortBy">
        <option value="date">開催日順</option>
        <option value="new">新着順</option>
        <option value="fav">お気に入り順</option>
      </select>
    </div>

    <!-- 検索結果 -->
    <div v-if="sortedEvents.length === 0">
      条件に一致するイベントが見つかりませんでした。
    </div>

    <div class="grid">
      <EventCard
        v-for="ev in sortedEvents"
        :key="ev.id"
        :eventData="ev"
      />
    </div>

  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.sort {
  margin: 20px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>