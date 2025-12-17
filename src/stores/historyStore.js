import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('historyStore', {
  state: () => ({
    history: JSON.parse(localStorage.getItem('history') || '[]')
  }),

  actions: {
    add(id) {
      // 重複を除外し先頭に追加（最大20件）
      this.history = [id, ...this.history.filter(i => i !== id)].slice(0, 20)

      localStorage.setItem('history', JSON.stringify(this.history))
    }
  }
})