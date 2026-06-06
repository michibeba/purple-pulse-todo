<template>
  <div class="celebration-overlay">
    <span
      v-for="sparkle in sparkles"
      :key="sparkle.id"
      class="sparkle"
      :style="{
        left: sparkle.left,
        animationDelay: sparkle.delay,
        animationDuration: sparkle.duration,
      }"
    >
      {{ sparkle.icon }}
    </span>
  </div>
</template>

<script setup>
const sparkles = [
  { id: 1, left: "5%", delay: "0s", duration: "3s", icon: "✨" },
  { id: 2, left: "12%", delay: "0.4s", duration: "4s", icon: "💜" },
  { id: 3, left: "20%", delay: "0.8s", duration: "3.5s", icon: "⭐" },
  { id: 4, left: "28%", delay: "0.2s", duration: "4.2s", icon: "✨" },
  { id: 5, left: "36%", delay: "1s", duration: "3.8s", icon: "🌙" },
  { id: 6, left: "44%", delay: "0.6s", duration: "4.5s", icon: "💫" },
  { id: 7, left: "52%", delay: "0.1s", duration: "3.3s", icon: "✨" },
  { id: 8, left: "60%", delay: "0.9s", duration: "4s", icon: "💜" },
  { id: 9, left: "68%", delay: "0.3s", duration: "3.6s", icon: "⭐" },
  { id: 10, left: "76%", delay: "1.2s", duration: "4.4s", icon: "✨" },
  { id: 11, left: "84%", delay: "0.7s", duration: "3.7s", icon: "🌙" },
  { id: 12, left: "92%", delay: "0.5s", duration: "4.1s", icon: "💫" },
];
</script>

<style scoped>
.celebration-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 50;
}

.sparkle {
  position: absolute;
  top: -40px;
  font-size: 1.8rem;
  animation-name: fallAndSpin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  filter: drop-shadow(0 0 10px rgba(216, 180, 254, 0.9));
}

@keyframes fallAndSpin {
  0% {
    transform: translateY(-50px) rotate(0deg) scale(0.8);
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  100% {
    transform: translateY(110vh) rotate(360deg) scale(1.2);
    opacity: 0;
  }
}
</style>