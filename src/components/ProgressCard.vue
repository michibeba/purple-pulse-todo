<template>
  <div class="bg-gradient-to-br from-purple-900/60 to-pink-900/40 border border-purple-400/20 rounded-3xl p-6 shadow-2xl shadow-purple-950/30">
    <p class="text-gray-300 mb-2">
      Progress
    </p>

    <h2 class="text-4xl font-bold mb-4">
      {{ progressPercent }}%
    </h2>

    <div class="w-full bg-[#1F2937] rounded-full h-4 overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>

    <p class="text-sm text-gray-300 mt-4">
      {{ completedCount }} of {{ totalCount }} missions completed.
    </p>
  </div>
</template>

<script setup>
defineProps({
  progressPercent: Number,
  completedCount: Number,
  totalCount: Number,
});
</script>