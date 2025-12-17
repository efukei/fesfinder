import { defineStore } from 'pinia'
import axios from 'axios'

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    events: [],
  }),

  actions: {
    async fetchEvents() {
      const res = await axios.get(
        'https://fesfinder.shop/wp-json/wp/v2/event?per_page=100'
      )
      this.events = res.data
    }
  }
})