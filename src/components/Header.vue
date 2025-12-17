<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import SearchBox from './SearchBox.vue'

const route = useRoute()

// 現在がトップページかどうか判定
const isHome = computed(() => route.path === '/')
</script>

<template>
  <header class="header">
    <div class="inner">

      <!-- ロゴ（クリックでトップへ） -->
      <RouterLink to="/" class="logo">
        FesFinder
      </RouterLink>

      <!-- トップページ以外で検索ボックスを表示 -->
      <div v-if="!isHome" class="search-area">
        <SearchBox />
      </div>

      <div class="right-buttons">
        <!-- ログイン（後で実装） -->
        <button class="btn login-btn">
          ログイン
        </button>

        <!-- お問い合わせボタン -->
        <RouterLink to="/contact" class="btn contact-btn">
          お問い合わせ
        </RouterLink>
      </div>

    </div>
  </header>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #222;
  text-decoration: none;
}

.search-area {
  flex: 1;
  margin: 0 20px;
}

.right-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #888;
  background: #f8f8f8;
  font-size: 14px;
  color: #222;
}

.contact-btn {
  background: #e8f2ff;
  border-color: #4d8fe6;
}
</style>