<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 入力項目
const keyword = ref('')
const genre = ref('')
const prefecture = ref('')

// 検索実行
const search = () => {
  router.push({
    path: '/search',
    query: {
      keyword: keyword.value || undefined,
      genre: genre.value || undefined,
      prefecture: prefecture.value || undefined
    }
  })
}
</script>

<template>
  <div class="search-box">
    <input
      type="text"
      v-model="keyword"
      placeholder="イベント名・会場名で検索"
      class="input"
    />

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
      <!-- アコーディオンメニューで地域＞都道府県を選択できるようにする -->
    </select>

    <button @click="search" class="btn">検索</button>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.input {
  padding: 8px;
  font-size: 14px;
  width: 200px;
}

.btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>