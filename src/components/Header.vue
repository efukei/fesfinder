<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import SearchBox from './SearchBox.vue'

defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})

const route = useRoute()

// 現在がトップページかどうか判定
const isHome = computed(() => route.path === '/')
</script>

<template>
  <header class="header">
    <div class="inner">

      <!-- ロゴ（クリックでトップへ） -->
      <RouterLink to="/" class="logo">
        <img src="../../img/logo.svg" alt="FesFinder" class="header-logo" />
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
        <!-- 
        <RouterLink to="/contact" class="btn contact-btn">
          お問い合わせ
        </RouterLink>
        -->
        <a href="https://fesfinder.shop/contact/" class="btn contact-btn" target=”_blank”>お問い合わせ</a>
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
  max-width: 100%;
  margin: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.header-logo {
  height: 32px;
  width: auto;
  display: block;
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
  padding: 0 20px;
  height: 45px; /* 後で修正 */
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  text-decoration: none;
}

.contact-btn {
  color: #fff;
  background: #1E3A5F;
}

.login-btn {
  display: none;
}
</style>