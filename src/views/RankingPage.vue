<script setup>
import battleAudio from '@/assets/Fanfare.opus'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const score = computed(() => Number(router.currentRoute.value.params.score) || 0)
const currentAudio = ref(null)

// Datos de ejemplo del ranking base
const listRanking = ref([
  { name: 'JUA', score: 9 },
  { name: 'PED', score: 8 },
  { name: 'MAR', score: 7 },
  { name: 'LUI', score: 6 },
  { name: 'ANA', score: 5 },
])

// === PASO 1: Variables para el sistema de ranking ===
const showNameInput = ref(false) // Controla si mostramos el input de nombre
const playerName = ref('') // Almacena el nombre que escribe el usuario
const playerAdded = ref(false) // Indica si el jugador ya fue añadido al ranking

const isPlaying = ref(true)

// === PASO 2: Función para verificar si el usuario merece entrar al ranking ===
const deservesRanking = computed(() => {
  // Obtenemos el score del último jugador del ranking
  const lastScore = listRanking.value[listRanking.value.length - 1].score
  // Si el score del usuario es MAYOR que el último, merece entrar
  return score.value > lastScore
})

// === PASO 3: Función para formatear el nombre ===
const formatName = (name) => {
  // Tomamos las primeras 3 letras y las convertimos a mayúsculas
  // Si el nombre tiene menos de 3 letras, usamos lo que haya
  return name.substring(0, 3).toUpperCase()
}

// === PASO 4: Función para insertar al jugador en el ranking ===
const addToRanking = () => {
  // Validamos que el nombre tenga al menos 1 caracter
  if (playerName.value.trim().length === 0) {
    alert('Por favor, ingresa tu nombre')
    return
  }

  // Formateamos el nombre (3 letras mayúsculas)
  const formattedName = formatName(playerName.value.trim())

  // Creamos el nuevo jugador
  const newPlayer = {
    name: formattedName,
    score: score.value,
  }

  // Añadimos el jugador al array
  listRanking.value.push(newPlayer)

  // Ordenamos el array de mayor a menor por score
  listRanking.value.sort((a, b) => b.score - a.score)

  // Eliminamos el último (el que quedó fuera del top 5)
  listRanking.value.pop()

  // Ocultamos el input y marcamos que ya se añadió
  showNameInput.value = false
  playerAdded.value = true
}

const stopPlayMusic = () => {
  if (currentAudio.value && isPlaying.value) {
    currentAudio.value.pause()
    isPlaying.value = false
    console.log('Audio pausado')
  } else if (currentAudio.value && !isPlaying.value) {
    currentAudio.value.play()
    isPlaying.value = true
    console.log('Audio reanudado')
  }
}

onMounted(() => {
  currentAudio.value = new Audio(battleAudio)
  currentAudio.value.volume = 0.5
  currentAudio.value.play().catch((e) => console.log('Audio play failed:', e))

  console.log('Score del jugador:', score.value)
  console.log(
    'Score del último del ranking:',
    listRanking.value[listRanking.value.length - 1].score,
  )
  console.log(
    '¿Merece entrar al ranking?:',
    score.value > listRanking.value[listRanking.value.length - 1].score,
  )

  // Si merece entrar al ranking, mostramos el input para el nombre
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

    <!-- === MODAL PARA INGRESAR NOMBRE === -->
    <!-- Se muestra solo si el usuario merece entrar al ranking -->
    <div v-if="showNameInput" class="name-modal">
      <div class="modal-content">
        <h2 class="modal-title">🎉 ¡NUEVO RECORD! 🎉</h2>
        <p class="modal-score">Tu puntuación: {{ score }}</p>
        <p class="modal-instruction">Ingresa tu nombre:</p>
        <input
          v-model="playerName"
          type="text"
          maxlength="10"
          placeholder="Tu nombre..."
          class="name-input"
          @keyup.enter="addToRanking"
        />
        <p class="modal-hint">(Se usarán las primeras 3 letras)</p>
        <button class="btn-confirm" @click="addToRanking">CONFIRMAR</button>
      </div>
    </div>

    <!-- Botón de silenciar música en la esquina superior derecha -->
    <!-- Botón de Play/Pause en la esquina superior derecha -->
    <button
      class="mute-button"
      @click="stopPlayMusic"
      :aria-label="isPlaying ? 'Pausar música' : 'Reproducir música'"
    >
      <!-- Icono de Pausa (cuando está sonando) -->
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
      <!-- Icono de Play (cuando está pausado) -->
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

/* === ESTILOS DEL MODAL PARA INGRESAR NOMBRE === */
.name-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #1a1a2e;
  border: 4px solid #00ffff;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-title {
  color: #ffff00;
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 0px #8b8b00;
}

.modal-score {
  color: #00ff00;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.modal-instruction {
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.name-input {
  width: 100%;
  max-width: 250px;
  padding: 15px;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  text-align: center;
  background: #000;
  border: 3px solid #ff00ff;
  color: #ff00ff;
  outline: none;
  margin: 1rem 0;
}

.name-input:focus {
  border-color: #ffff00;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}

.name-input::placeholder {
  color: #666;
  text-transform: none;
}

.modal-hint {
  color: #888;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.btn-confirm {
  background: #ff00ff;
  border: none;
  color: white;
  padding: 15px 40px;
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}

.btn-confirm:hover {
  background: #ff66ff;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
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
