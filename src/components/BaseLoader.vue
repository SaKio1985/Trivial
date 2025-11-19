<template>
  <div class="loader-container" :style="{ width: size + 'px', height: size + 'px' }">
    <svg viewBox="0 0 50 50">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
        :stroke="color"
      ></circle>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 40 },
  color: { type: String, default: '#1976d2' },
})
</script>

<style scoped>
.loader-container svg {
  animation: rotate 2s linear infinite;
  transform-origin: center center;
  width: 100%;
  height: 100%;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
