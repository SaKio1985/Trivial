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
  padding: 1rem;
}
.hero-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(123, 16, 65, 0.15);
  padding: 3rem;
  text-align: center;
  width: 100%;
  max-width: 420px;
}
.subtitle {
  margin: 1rem 0 2rem;
  font-weight: 600;
  color: var(--raspberry-red);
}
.title {
  font-size: clamp(2rem, 6vw, 3rem);
  margin-bottom: 0.5rem;
  color: var(--burgundy-dark);
}

.subtitle {
  margin: 1rem 0 2rem;
  font-weight: 600;
  color: var(--raspberry-red);
  font-size: clamp(1rem, 3vw, 1.2rem);
}
button {
  background: var(--raspberry-red);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 250px;
}

button:hover {
  background: var(--raspberry-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(189, 24, 82, 0.3);
}

button:active {
  transform: translateY(0);
}

/* Tablet */
@media (max-width: 768px) {
  .hero-card {
    padding: 2.5rem;
    border-radius: 20px;
  }

  button {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .home {
    padding: 0.5rem;
  }

  .hero-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  .subtitle {
    margin: 0.75rem 0 1.5rem;
  }

  button {
    padding: 0.85rem 1.5rem;
    font-size: 0.95rem;
    max-width: 100%;
  }
}
</style>
