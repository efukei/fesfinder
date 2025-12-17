<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEventStore } from '../stores/eventStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useHistoryStore } from '../stores/historyStore'

const route = useRoute()
const eventStore = useEventStore()
const favoriteStore = useFavoriteStore()
const historyStore = useHistoryStore()

// 単一イベントデータ
const eventData = ref(null)

// ページ読み込み時
onMounted(async () => {
  const slug = route.params.slug

  // イベント一覧が未取得ならロード
  if (eventStore.events.length === 0) {
    await eventStore.fetchEvents()
  }

  // slugの一致するイベントを検索
  eventData.value = eventStore.events.find(ev => ev.slug === slug)

  // 履歴追加
  if (eventData.value) {
    historyStore.add(eventData.value.id)
  }
})

// お気に入り判定
const isFavorite = computed(() => {
  if (!eventData.value) return false
  return favoriteStore.favorites.includes(eventData.value.id)
})

// お気に入り登録トグル
const toggleFavorite = () => {
  if (eventData.value) {
    favoriteStore.toggle(eventData.value.id)
  }
}
</script>

<template>
  <div class="container">

    <div v-if="!eventData">読み込み中...</div>

    <div v-else class="detail">

      <!-- サムネイル -->
      <div class="thumb">
        <img
          :src="eventData.acf?.thumbnail || '/noimage.png'"
          alt="thumbnail"
        />
      </div>

      <h1>{{ eventData.title?.rendered }}</h1>

      <!-- お気に入りボタン -->
      <button class="fav-btn" @click="toggleFavorite">
        <span v-if="isFavorite">★ お気に入り解除</span>
        <span v-else>☆ お気に入りに追加</span>
      </button>

      <table>
        <tr>
          <th>開催日</th>
          <td>{{ eventData.acf?.event_date || '未定' }}</td>
        </tr>

        <tr>
          <th>会場</th>
          <td>{{ eventData.acf?.venue || '未定' }}</td>
        </tr>

        <tr>
          <th>住所</th>
          <td>{{ eventData.acf?.address || '情報なし' }}</td>
        </tr>

        <tr>
          <th>ジャンル</th>
          <td>{{ eventData.acf?.genre || '未設定' }}</td>
        </tr>

        <tr>
          <th>公式URL</th>
          <td>
            <a 
              v-if="eventData.acf?.official_url" 
              :href="eventData.acf.official_url" 
              target="_blank"
            >
              公式サイトへ
            </a>
            <span v-else>なし</span>
          </td>
        </tr>
      </table>

    </div>

  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.detail h1 {
  margin-top: 16px;
}

.thumb img {
  width: 100%;
  border-radius: 8px;
}

.fav-btn {
  margin: 12px 0;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #aaa;
  background: white;
}

table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 8px;
  background: #f0f0f0;
  width: 150px;
}

td {
  padding: 8px;
}
</style>