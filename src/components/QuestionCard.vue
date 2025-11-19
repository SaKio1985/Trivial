<script setup>
defineProps({
  question: {
    type: Object,
    required: true,
    default: null,
  },
})

defineEmits(['answer'])
</script>

<template>
  <div class="question-card" v-if="question">
    <div class="meta">
      <span class="category">{{ question.category }}</span>
      <span class="difficulty">{{ question.difficulty }}</span>
    </div>
    <h2>{{ question.question }}</h2>
  </div>
</template>

<style scoped>
.question-card {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}
.meta {
  margin-bottom: 10px;
}
.category {
  background: #e0e0e0;
  padding: 4px 8px;
  margin-right: 8px;
  color: black;
}
.difficulty {
  background: #d4edda;
  padding: 4px 8px;
  color: black;
}
.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 10px;
  cursor: pointer;
}
</style>
