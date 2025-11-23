<script setup>
defineProps({
  texto: String,
  funcionalidad: Function,
})
</script>

<template>
  <button class="game-button" @click="funcionalidad">
    {{ texto }}
  </button>
</template>

<style scoped>
.game-button {
  background: linear-gradient(135deg, var(--raspberry-red) 0%, var(--burgundy-dark) 100%);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 10px 30px rgba(189, 24, 82, 0.3);
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.game-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
}

.game-button:hover::before {
  width: 300px;
  height: 300px;
}

.game-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(189, 24, 82, 0.4);
}

.game-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .game-button {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .game-button {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
}
</style>
