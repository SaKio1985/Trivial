<script setup>
const emit = defineEmits(['select'])

defineProps({
  answers: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const selectAnswer = (answer) => {
  emit('select', answer)
}
</script>

<template>
  <div class="answers">
    <button v-for="answer in answers" :key="answer.id" type="button" @click="selectAnswer(answer)">
      {{ answer.text }}
    </button>
  </div>
</template>

<style scoped>
.answers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answers button {
  border: 1px solid transparent;
  border-radius: 18px;
  background: var(--raspberry-red);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0.95rem 1.2rem;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(189, 24, 82, 0.28);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}

.answers button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(189, 24, 82, 0.36);
  background: var(--raspberry-red-dark);
}

.answers button:focus-visible {
  outline: none;
  border-color: var(--peach-outline);
  box-shadow:
    0 18px 40px rgba(189, 24, 82, 0.36),
    0 0 0 3px rgba(247, 207, 160, 0.4);
}

.answers button:active {
  transform: translateY(0);
}
</style>
