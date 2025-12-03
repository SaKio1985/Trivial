<script setup>
import battleAudio from '@/assets/Fanfare.opus'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentAudio = ref(null)

// Datos de ejemplo
const listRanking = ref([
  { name: 'JUA', score: 50000 },
  { name: 'PED', score: 45000 },
  { name: 'MAR', score: 40000 },
  { name: 'LUI', score: 35000 },
  { name: 'ANA', score: 30000 },
])

const stopMusic = () => {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
  }
}

onMounted(() => {
  currentAudio.value = new Audio(battleAudio)
  currentAudio.value.volume = 0.5
  currentAudio.value.play().catch((e) => console.log('Audio play failed:', e))
})

onUnmounted(() => {
  stopMusic()
})

const restartGame = () => {
  stopMusic()
  router.push({ name: 'game' })
}

const goHome = () => {
  stopMusic()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="arcade-container">
    <h1 class="title">TOP PLAYERS</h1>

    <!-- Usamos una tabla HTML estándar para simplificar la estructura -->
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
          :key="user.name"
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

    <!-- Botón de silenciar música en la esquina superior derecha -->
    <button class="mute-button" @click="stopMusic" aria-label="Silenciar música">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Estilos base simples */
.arcade-container {
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Para posicionar el botón de silencio */
  /* Usamos una fuente monoespaciada estándar que todos los navegadores tienen */
  font-family: 'Courier New', Courier, monospace;
}

.title {
  color: #ff0000; /* Rojo arcade */
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 4px 4px 0px #8b0000; /* Sombra sólida simple */
}

.ranking-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse; /* Elimina espacios entre bordes de celda */
  margin-bottom: 3rem;
  font-size: 1.5rem;
  text-align: center;
}

th {
  color: #00ffff; /* Cyan */
  padding: 15px;
  border-bottom: 4px solid #00ffff;
  letter-spacing: 2px;
}

td {
  padding: 15px;
  color: #ffff00; /* Amarillo por defecto */
}

/* Clase especial para el primer lugar */
.first-place td {
  color: #ff00ff; /* Magenta */
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
  font-family: inherit; /* Hereda la fuente Courier */
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-arcade:hover {
  background-color: white;
  color: black;
  transform: scale(1.05); /* Pequeño efecto de zoom */
}

/* Botón de silencio flotante */
.mute-button {
  position: fixed;
  top: 20px;
  right: 20px;
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

/* Ajuste para móviles */
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
