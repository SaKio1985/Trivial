<script setup>
defineProps({
  texto: String,
  funcionalidad: Function,
})
</script>

<template>
  <button @click="funcionalidad">{{ texto }}</button>
</template>

<style scoped></style>
