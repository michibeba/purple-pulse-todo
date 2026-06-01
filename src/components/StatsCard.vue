<template>
  <div
    class="bg-[#111827] rounded-3xl p-6 border"
    :class="borderClass"
  >
    <p class="text-gray-400">
      {{ label }}
    </p>

    <h3
      class="text-4xl font-bold"
      :class="textClass"
    >
      {{ value }}
    </h3>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: Number,
  textClass: String,
  borderClass: String,
});
</script>