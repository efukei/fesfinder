import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('fav') || '[]')
  }),

  actions: {
    toggle(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(i => i !== id)
      } else {
        this.favorites.push(id)
      }
      localStorage.setItem('fav', JSON.stringify(this.favorites))
    }
  }
})