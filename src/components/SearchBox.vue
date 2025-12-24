<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 入力項目
const keyword = ref('')
const genre = ref('')
const prefecture = ref('')
const eventDateFrom = ref('')
const eventDateTo = ref('')

// UI制御
const isOpen = ref(false)
const searchBoxRef = ref(null)

// 外クリック判定
const handleClickOutside = (e) => {
  if (!searchBoxRef.value) return
  if (!searchBoxRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

// 検索実行
const submitSearch = () => {
  router.push({
    path: '/search',
    query: {
      keyword: keyword.value || undefined,
      genre: genre.value || undefined,
      prefecture: prefecture.value || undefined,
      from: eventDateFrom.value || undefined,
      to: eventDateTo.value || undefined
    }
  })
  isOpen.value = false
}

// マウント時に登録
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 破棄時に解除（超重要）
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <form class="search-form" ref="searchBoxRef" @submit.prevent="submitSearch">
    <!-- 検索フォーム -->
    <div class="main-row">
      <input
        type="text"
        v-model="keyword"
        class="main-input"
        placeholder="イベント名・ジャンル・地域で探す"
        @focus="isOpen = true"
      />

      <!-- 常時表示の検索ボタン -->
      <button type="submit" class="search-btn">
        検索
      </button>
    </div>

    <!-- 詳細条件パネル -->
    <div v-if="isOpen" class="detail-panel">
      <select v-model="genre" class="input">
        <option value="">ジャンル（すべて）</option>
        <option value="1">同人誌・書籍</option>
        <option value="2">グッズ・雑貨</option>
        <option value="3">造形・立体</option>
        <option value="4">音系・メディア</option>
        <option value="5">ゲーム・インタラクティブ</option>
        <option value="6">総合クリエイター</option>
      </select>

      <select v-model="prefecture" class="input">
        <option value="">都道府県</option>
        <option value="東京都">東京都</option>
        <option value="大阪府">大阪府</option>
        <option value="愛知県">愛知県</option>
        <option value="福岡県">福岡県</option>
      </select>

      <div class="date-row">
        <input v-model="eventDateFrom" type="date" class="input" />
        <span>～</span>
        <input v-model="eventDateTo" type="date" class="input" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

.main-row {
  display: flex;
  gap: 8px;
}

.main-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
}

.search-btn {
  padding: 0 20px;
  font-size: 14px;
  background: #1E3A5F;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.detail-panel {
  margin-top: 8px;
  padding: 12px;
  border: 1px solid #ddd;
  background: #fff;
  display: grid;
  gap: 8px;
}

.input {
  padding: 8px;
  font-size: 14px;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>