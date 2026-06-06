<template>
  <div
    class="relative overflow-hidden bg-gradient-to-br from-purple-900/60 to-pink-900/40 border border-purple-400/20 rounded-3xl p-6 shadow-2xl shadow-purple-950/30"
  >
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>

    <div class="relative z-10">
      <p class="text-gray-300 mb-2">
        Progress
      </p>

      <div class="flex items-end gap-3 mb-4">
        <h2 class="text-5xl font-bold">
          {{ progressPercent }}%
        </h2>

        <span
          v-if="progressPercent === 100 && totalCount > 0"
          class="text-3xl celebration"
        >
          ✨
        </span>
      </div>

      <div class="w-full bg-[#1F2937] rounded-full h-5 overflow-hidden border border-purple-500/20">
        <div
          class="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 transition-all duration-700 ease-out progress-glow"
          :class="{ 'complete-pulse': progressPercent === 100 && totalCount > 0 }"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>

      <p class="text-sm text-gray-300 mt-4">
        {{ completedCount }} of {{ totalCount }} missions completed.
      </p>

      <p
        v-if="progressPercent === 100 && totalCount > 0"
        class="mt-4 text-pink-200 font-semibold celebration-text"
      >
        All missions complete. You’re glowing today 💜
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progressPercent: Number,
  completedCount: Number,
  totalCount: Number,
});
</script>

<style scoped>
.progress-glow {
  box-shadow: 0 0 18px rgba(216, 180, 254, 0.7);
}

.complete-pulse {
  animation: pulseGlow 1.2s infinite alternate;
}

.celebration {
  animation: sparkle 0.8s infinite alternate;
}

.celebration-text {
  animation: fadeUp 0.5s ease-out;
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 0 15px rgba(216, 180, 254, 0.6);
  }

  to {
    box-shadow: 0 0 35px rgba(244, 114, 182, 1);
  }
}

@keyframes sparkle {
  from {
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }

  to {
    transform: scale(1.25) rotate(12deg);
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>