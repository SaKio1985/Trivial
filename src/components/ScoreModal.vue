<script setup>
import { ref } from 'vue'

defineProps({
  score: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['confirm'])

const playerName = ref('')

const handleConfirm = () => {
  if (playerName.value.trim().length === 0) {
    alert('Por favor, ingresa tu nombre')
    return
  }
  emit('confirm', playerName.value)
}
</script>

<template>
  <div class="name-modal">
    <div class="modal-content">
      <h2 class="modal-title">🎉 ¡NUEVO RECORD! 🎉</h2>
      <p class="modal-score">Tu puntuación: {{ score }}</p>
      <p class="modal-instruction">Ingresa tu nombre:</p>
      <input
        v-model="playerName"
        type="text"
        maxlength="10"
        placeholder="Tu nombre..."
        class="name-input"
        @keyup.enter="handleConfirm"
      />
      <p class="modal-hint">(Se usarán las primeras 3 letras)</p>
      <button class="btn-confirm" @click="handleConfirm">CONFIRMAR</button>
    </div>
  </div>
</template>

<style scoped>
.name-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #1a1a2e;
  border: 4px solid #00ffff;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-title {
  color: #ffff00;
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 0px #8b8b00;
}

.modal-score {
  color: #00ff00;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.modal-instruction {
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.name-input {
  width: 100%;
  max-width: 250px;
  padding: 15px;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  text-align: center;
  background: #000;
  border: 3px solid #ff00ff;
  color: #ff00ff;
  outline: none;
  margin: 1rem 0;
}

.name-input:focus {
  border-color: #ffff00;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}

.name-input::placeholder {
  color: #666;
  text-transform: none;
}

.modal-hint {
  color: #888;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.btn-confirm {
  background: #ff00ff;
  border: none;
  color: white;
  padding: 15px 40px;
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}

.btn-confirm:hover {
  background: #ff66ff;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
}
</style>
