<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

const gifUrl = ref('')
const loading = ref(false)

// API Key de Giphy (Beta key para desarrollo)
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY

const fetchGif = async (searchTerm) => {
  if (!searchTerm) return

  loading.value = true
  try {
    // Si la categoría tiene dos partes (ej: "Entertainment: Video Games"),
    // usamos solo la segunda parte ("Video Games").
    // Si es una categoría simple (ej: "Sports"), la usamos tal cual.
    const cleanTerm = searchTerm.includes(':') ? searchTerm.split(':')[1].trim() : searchTerm

    // Usamos un offset aleatorio para obtener gifs diferentes cada vez
    const randomOffset = Math.floor(Math.random() * 50)

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(cleanTerm)}&limit=1&offset=${randomOffset}&rating=g&lang=en`,
    )
    const data = await response.json()

    if (data.data && data.data.length > 0) {
      gifUrl.value = data.data[0].images.original.url
    } else {
      gifUrl.value = ''
    }
  } catch (error) {
    console.error('Error fetching GIF:', error)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.category,
  (newCategory) => {
    fetchGif(newCategory)
  },
  { immediate: true },
)
</script>

<template>
  <header class="giphy-header" v-if="gifUrl">
    <div class="gif-container">
      <img :src="gifUrl" :alt="`Gif about ${category}`" class="topic-gif" />
      <div class="overlay"></div>
    </div>
  </header>
</template>

<style scoped>
.giphy-header {
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.gif-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.topic-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
  pointer-events: none;
}

@media (max-width: 768px) {
  .giphy-header {
    height: 100px;
  }
}
</style>
