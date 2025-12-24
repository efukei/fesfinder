<script setup>
defineProps({
  eventData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-if="!eventData" class="card">データなし</div>

  <div v-else class="card">
    <router-link :to="`/event/${eventData.slug}`" class="card-link">
      <div class="thumb">
        <img
          :src="eventData.acf?.thumbnail || '/noimage.png'"
          alt="thumbnail"
        />
      </div>

      <h3>{{ eventData.title?.rendered }}</h3>

      <p class="date">
        {{ eventData.acf?.event_date || '日付未定' }}
      </p>

      <p class="venue">
        {{ eventData.acf?.venue || '会場未定' }}
      </p>

    </router-link>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}



.thumb img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  background: #f5f5f5;
}

.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
</style>