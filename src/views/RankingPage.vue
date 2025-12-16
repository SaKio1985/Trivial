<script setup>
import battleAudio from '@/assets/Fanfare.opus'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScoreModal from '@/components/ScoreModal.vue'

const router = useRouter()
const score = computed(() => Number(router.currentRoute.value.params.score) || 0)
const currentAudio = ref(null)

// Ranking inicial (se sobrescribe con localStorage si existe)
const listRanking = ref([
  { name: 'JUA', score: 9 },
  { name: 'PED', score: 8 },
  { name: 'MAR', score: 7 },
  { name: 'LUI', score: 6 },
  { name: 'ANA', score: 5 },
])
if (localStorage.getItem('ranking')) {
  listRanking.value = JSON.parse(localStorage.getItem('ranking'))
}

const showNameInput = ref(false)
const playerAdded = ref(false)

const isPlaying = ref(true)

const deservesRanking = computed(() => {
  const lastScore = listRanking.value[listRanking.value.length - 1].score
  return score.value > lastScore
})

const formatName = (name) => {
  return name.substring(0, 3).toUpperCase()
}

const addToRanking = (name) => {
  const formattedName = formatName(name.trim())
  const newPlayer = { name: formattedName, score: score.value }

  listRanking.value.push(newPlayer)
  listRanking.value.sort((a, b) => b.score - a.score)
  listRanking.value.pop()

  localStorage.setItem('ranking', JSON.stringify(listRanking.value))
  showNameInput.value = false
  playerAdded.value = true
}

const stopPlayMusic = () => {
  if (currentAudio.value && isPlaying.value) {
    currentAudio.value.pause()
    isPlaying.value = false
  } else if (currentAudio.value && !isPlaying.value) {
    currentAudio.value.play()
    isPlaying.value = true
  }
}

onMounted(() => {
  currentAudio.value = new Audio(battleAudio)
  currentAudio.value.volume = 0.5
  currentAudio.value.play().catch(() => {})

  if (deservesRanking.value) {
    showNameInput.value = true
  }
})

onUnmounted(() => {
  stopPlayMusic()
})

const restartGame = () => {
  stopPlayMusic()
  router.push({ name: 'game' })
}

const goHome = () => {
  stopPlayMusic()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="arcade-container">
    <h1 class="title">TOP PLAYERS</h1>

    <ScoreModal v-if="showNameInput" :score="score" @confirm="addToRanking" />

    <button
      class="mute-button"
      @click="stopPlayMusic"
      :aria-label="isPlaying ? 'Pausar música' : 'Reproducir música'"
    >
      <svg
        v-if="isPlaying"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    </button>

    <table class="ranking-table">
      <thead>
        <tr>
          <th>RANK</th>
          <th>SCORE</th>
          <th>NAME</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in listRanking"
          :key="user.name + user.score"
          :class="{ 'first-place': index === 0 }"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ user.score }}</td>
          <td>{{ user.name }}</td>
        </tr>
      </tbody>
    </table>

    <div class="actions">
      <button class="btn-arcade" @click="restartGame">INSERT COIN (RESTART)</button>
      <button class="btn-arcade" @click="goHome">EXIT</button>
    </div>
  </div>
</template>

<style scoped>
.arcade-container {
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Courier New', Courier, monospace;
}

.title {
  color: #ff0000;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 4px 4px 0px #8b0000;
}

.ranking-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin-bottom: 3rem;
  font-size: 1.5rem;
  text-align: center;
}

th {
  color: #00ffff;
  padding: 15px;
  border-bottom: 4px solid #00ffff;
  letter-spacing: 2px;
}

td {
  padding: 15px;
  color: #ffff00;
}

.first-place td {
  color: #ff00ff;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-arcade {
  background: transparent;
  border: 4px solid white;
  color: white;
  padding: 15px 30px;
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-arcade:hover {
  background-color: white;
  color: black;
  transform: scale(1.05);
}

.mute-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 0, 0, 0.8);
  border: 3px solid white;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
  padding: 12px;
}

.mute-button:hover {
  background-color: rgba(255, 0, 0, 1);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
}

.mute-button svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
  .ranking-table {
    font-size: 1rem;
  }
  .btn-arcade {
    padding: 10px 20px;
    font-size: 1rem;
  }
  .mute-button {
    width: 50px;
    height: 50px;
    top: 15px;
    right: 15px;
  }
}
</style>
