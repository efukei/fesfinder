<script setup>
import { onMounted, computed } from 'vue'
import { useEventStore } from '../stores/eventStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useHistoryStore } from '../stores/historyStore'

import SearchBox from '../components/SearchBox.vue'
import EventCard from '../components/EventCard.vue'

// store読み込み
const eventStore = useEventStore()
const favoriteStore = useFavoriteStore()
const historyStore = useHistoryStore()

// 初回ロードでイベント取得
onMounted(() => {
  if (eventStore.events.length === 0) {
    eventStore.fetchEvents()
  }
})

// 新着イベント（最新10件）
const newEvents = computed(() => {
  return [...eventStore.events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10)
})

// 最近見たイベント
const recentEvents = computed(() => {
  return eventStore.events.filter(e =>
    historyStore.history.includes(e.id)
  )
})

// お気に入りイベント
const favoriteEvents = computed(() => {
  return eventStore.events.filter(e =>
    favoriteStore.favorites.includes(e.id)
  )
})
</script>

<template>
  <div class="container">

    <!-- 検索ボックス -->
    <SearchBox />

    <!-- 新着イベント -->
    <section>
      <h2 class="section-title">新着イベント</h2>
      <div class="grid">
        <EventCard
          v-for="ev in newEvents"
          :key="ev.id"
          :eventData="ev"
        />
      </div>
    </section>

    <!-- 最近見たイベント -->
    <section v-if="recentEvents.length">
      <h2 class="section-title">最近見たイベント</h2>
      <div class="grid">
        <EventCard
          v-for="ev in recentEvents"
          :key="ev.id"
          :eventData="ev"
        />
      </div>
    </section>

    <!-- お気に入りイベント -->
    <section v-if="favoriteEvents.length">
      <h2 class="section-title">お気に入り</h2>
      <div class="grid">
        <EventCard
          v-for="ev in favoriteEvents"
          :key="ev.id"
          :eventData="ev"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 1.4rem;
  margin: 20px 0 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}
</style>