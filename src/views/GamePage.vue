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
        <span>{{ currentQuestion.category }}</span>
        <span>{{ currentQuestion.difficulty }}</span>
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
  padding: 3rem 1.5rem;
  position: relative;
  align-items: center;
}
.question-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0 18px 60px rgba(123, 16, 65, 0.18);
  width: 800px;
  height: 800px;
}
.question-title {
  font-family: 'Audiowide', sans-serif;
  color: var(--burgundy-dark);
  font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  margin-bottom: 1.5rem;
}
.meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--burgundy-dark);
}
.score-badge {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: var(--raspberry-red);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  box-shadow: 0 10px 20px rgba(189, 24, 82, 0.2);
  font-weight: 600;
  letter-spacing: 1px;
}
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
