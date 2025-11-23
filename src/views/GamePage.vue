<script setup>
import { ref, onMounted, computed } from 'vue'
import obtenerPreguntas from '@/services/api'
import AnswerCard from '@/components/AnswerCard.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import obtenerRespuestas from '@/services/answers'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado del juego
const questions = ref([]) // Aqui se cargan todas las preguntas
const score = ref(0)

const loadQuestions = async () => {
  try {
    const response = await obtenerPreguntas()
    questions.value = response
    console.log('cargando preguntas')
  } catch (error) {
    console.error('Error cargando preguntas', error)
    questions.value = []
  }
}

const advanceQuestion = async () => {
  questions.value.shift()
  if (!questions.value.length) {
    router.push({ name: 'finish', params: { score: score.value } })
  }
}

const currentQuestion = computed(() => (questions.value.length ? questions.value[0] : null))

const currentAnswers = computed(() => {
  if (!currentQuestion.value) return []
  const { incorrect_answers, correct_answer } = currentQuestion.value
  return obtenerRespuestas(incorrect_answers, correct_answer)
})

// Cargar una pregunta al montar la página
onMounted(() => {
  loadQuestions()
})

// Manejar la respuesta del usuario
const handleAnswer = async (answer) => {
  if (answer.isCorrect) {
    score.value++
    console.log('¡Correcto!')
  } else {
    console.log('Incorrecto')
  }

  await advanceQuestion()
}
</script>

<template>
  <div class="game-container">
    <section class="question-card" v-if="currentQuestion">
      <h2 v-html="currentQuestion.question" class="question-title"></h2>
      <p class="meta">
        <span class="category" v-html="currentQuestion.category"></span>
        <span class="difficulty" v-html="currentQuestion.difficulty"></span>
      </p>
      <AnswerCard :answers="currentAnswers" @select="handleAnswer" />
    </section>
    <div v-else class="loader">
      <BaseLoader :size="70" :color="'var(--peach-outline)'" />
    </div>
    <aside class="score-badge">Score: {{ score }}</aside>
  </div>
</template>

<style scoped>
.game-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at top, var(--peach-pastel), #fef2e8 40%, #f7dac5 100%);
  padding: 1rem;
  position: relative;
  align-items: center;
}
.question-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 18px 60px rgba(123, 16, 65, 0.18);
  width: 100%;
  max-width: 800px;
  min-height: 500px;
  gap: 2rem;
}
.question-title {
  font-family: 'Audiowide', sans-serif;
  color: var(--burgundy-dark);
  font-size: clamp(1.2rem, 4vw, 2.4rem);
  margin-bottom: 1rem;
  line-height: 1.4;
}
.meta {
  display: flex;
  gap: 0.75rem;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: var(--burgundy-dark);
  flex-wrap: wrap;
}
/* ✨ MEJORAS EN LAS ETIQUETAS */
.meta span {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: transform 0.2s ease;
}

.meta span:hover {
  transform: translateY(-2px);
}

.category {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

.difficulty {
  background: rgba(189, 24, 82, 0.1);
  color: var(--raspberry-red);
  border: 2px solid var(--raspberry-red);
  font-weight: 700;
}
.score-badge {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--raspberry-red);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  box-shadow: 0 10px 20px rgba(189, 24, 82, 0.2);
  font-weight: 600;
  letter-spacing: 1px;
  z-index: 10;
}
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .game-container {
    padding: 1rem 0.5rem;
  }

  .question-card {
    padding: 1.5rem;
    border-radius: 20px;
    min-height: auto;
    gap: 1.5rem;
  }

  .score-badge {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .game-container {
    padding: 0.5rem;
  }

  .question-card {
    padding: 1.25rem;
    border-radius: 16px;
    gap: 1.25rem;
  }

  .question-title {
    margin-bottom: 0.75rem;
  }

  .meta {
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  .score-badge {
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
  }
}
</style>
