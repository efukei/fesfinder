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

    <!-- ロゴ -->
    <div class="logo">
      <img src="../../img/logo.svg" alt="FesFinder" class="logo" />
    </div>

    <!-- 検索ボックス -->
    <SearchBox />

    <!-- 新着イベント -->
    <section>
      <h2 class="section-title">新着イベント</h2>
      <div class="horizontal-scroll">
        <EventCard
          v-for="ev in newEvents"
          :key="ev.id"
          :eventData="ev"
          class="scroll-item"
        />
      </div>
    </section>

    <!-- 最近見たイベント -->
    <section v-if="recentEvents.length">
      <h2 class="section-title">最近見たイベント</h2>
      <div class="horizontal-scroll">
        <EventCard
          v-for="ev in recentEvents"
          :key="ev.id"
          :eventData="ev"
          class="scroll-item"
        />
      </div>
    </section>

    <!-- お気に入りイベント -->
    <section v-if="favoriteEvents.length">
      <h2 class="section-title">お気に入り</h2>
      <div class="horizontal-scroll">
        <EventCard
          v-for="ev in favoriteEvents"
          :key="ev.id"
          :eventData="ev"
          class="scroll-item"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-wrapper {
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 中央寄せコンテナ */
.center-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ロゴ */
.logo {
  max-width: 700px;
  margin: 50px auto;
}

/* 検索ボックス幅制御 */
.search-box {
  width: 100%;
  max-width: 520px;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  color: #fff;
  background: linear-gradient(to left, #fff, #1E3A5F);
  font-size: 1.4rem;
  margin: 20px 0 10px;
  border-left: 15px solid #1E3A5F;
  margin-top: 100px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

/* 横スクロールコンテナ */
.horizontal-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 12px; 
  scroll-behavior: smooth;
}

/* 各カードの幅を固定 */
.scroll-item {
  flex: 0 0 240px;
}

.horizontal-scroll::-webkit-scrollbar {
  height: 8px;
}

.horizontal-scroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.horizontal-scroll::-webkit-scrollbar-track {
  background: transparent;
}
</style>