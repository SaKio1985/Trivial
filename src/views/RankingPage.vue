<script setup>
import battleAudio from '@/assets/Fanfare.mp3'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const audio = new Audio(battleAudio)
  audio.play()
})

const listRanking = [
  {
    name: 'Juan',
    score: 10,
  },
  {
    name: 'Pedro',
    score: 9,
  },
  {
    name: 'Maria',
    score: 8,
  },
  {
    name: 'Luis',
    score: 7,
  },
  {
    name: 'Ana',
    score: 6,
  },
]

const restartGame = () => {
  router.push({ name: 'game' })
}

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="finish-container">
    <div class="finish-card">
      <h1 class="title">Ranking</h1>
      <div class="ranking" v-for="(user, index) in listRanking" :key="user.name">
        {{ index + 1 }}. {{ user.name }} score: {{ user.score }}
      </div>
      <div class="button-group">
        <button class="btn-primary" @click="restartGame">🔄 Jugar de nuevo</button>
        <button class="btn-secondary" @click="goHome">🏠 Ir al inicio</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.finish-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle at top, var(--peach-pastel), #fef2e8 40%, #f7dac5 100%);
  padding: 1rem;
}

.finish-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(123, 16, 65, 0.2);
  padding: 3rem;
  text-align: center;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.title {
  font-family: 'Audiowide', sans-serif;
  color: var(--burgundy-dark);
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  margin: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 14px;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary {
  background: var(--raspberry-red);
  color: white;
  box-shadow: 0 8px 20px rgba(189, 24, 82, 0.25);
}

.btn-primary:hover {
  background: var(--raspberry-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(189, 24, 82, 0.35);
}

.btn-secondary {
  background: white;
  color: var(--raspberry-red);
  border: 2px solid var(--raspberry-red);
}

.btn-secondary:hover {
  background: var(--raspberry-red);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(189, 24, 82, 0.25);
}

button:active {
  transform: translateY(0);
}

/* Tablet */
@media (max-width: 768px) {
  .finish-card {
    padding: 2.5rem;
    gap: 1.5rem;
  }

  button {
    padding: 0.9rem 1.8rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .finish-container {
    padding: 0.5rem;
  }

  .finish-card {
    padding: 2rem 1.5rem;
    border-radius: 20px;
    gap: 1.5rem;
  }

  .button-group {
    gap: 0.85rem;
  }

  button {
    padding: 0.85rem 1.5rem;
  }
}

.ranking {
  color: black;
}
</style>
