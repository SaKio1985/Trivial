<script setup>
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const router = useRouter()
const score = computed(() => router.currentRoute.value.params.score || 0)
const percentage = computed(() => Math.round((score.value / 10) * 100))

const getMessage = () => {
  if (percentage.value >= 90) return '¡Increíble! 🎉'
  if (percentage.value >= 70) return '¡Muy bien! 👏'
  if (percentage.value >= 50) return 'Buen intento 👍'
  return 'Sigue practicando 💪'
}

onMounted(() => {
  setTimeout(() => {
    router.push({ name: 'ranking', params: { score: score.value } })
  }, 3000)
})
</script>

<template>
  <div class="finish-container">
    <div class="finish-card">
      <h1 class="title">{{ getMessage() }}</h1>
      <div class="score-display">
        <div class="score-circle">
          <span class="score-number">{{ score }}</span>
          <span class="score-total">/10</span>
        </div>
        <p class="percentage">{{ percentage }}%</p>
      </div>
      <p class="message">Tu puntuación final</p>
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

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.score-circle {
  background: var(--raspberry-red);
  width: clamp(150px, 30vw, 200px);
  height: clamp(150px, 30vw, 200px);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 40px rgba(189, 24, 82, 0.3);
}

.score-number {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 700;
  color: white;
  line-height: 1;
}

.score-total {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.percentage {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--raspberry-red);
  margin: 0;
}

.message {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: var(--burgundy-dark);
  font-weight: 600;
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
</style>
