<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const startGame = () => {
  //alert('Game started')
  router.push({ name: 'game' })
}
</script>

<template>
  <main class="home">
    <section class="hero-card">
      <h1 class="title">Trivial</h1>
      <p class="subtitle">Acierta las maximas posibles</p>
      <ButtonComponent texto="Start Game" :funcionalidad="startGame" />
    </section>
  </main>
</template>
º

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--bg-base);
  padding: 2rem;
}
.hero-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(123, 16, 65, 0.15);
  padding: 3rem;
  text-align: center;
  max-width: 420px;
}
.subtitle {
  margin: 1rem 0 2rem;
  font-weight: 600;
  color: var(--raspberry-red);
}
</style>
