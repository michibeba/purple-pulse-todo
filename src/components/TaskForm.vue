<template>
  <section class="bg-[#111827] border border-purple-500/20 rounded-3xl p-6 shadow-2xl shadow-purple-950/20">
    <h2 class="text-2xl font-bold text-purple-300 mb-2">
      Add a new mission 💜
    </h2>

    <p class="text-gray-400 mb-5">
      Write your next task and choose its priority.
    </p>

    <div class="flex flex-col md:flex-row gap-4">
      <input
        v-model="title"
        type="text"
        placeholder="Enter a task..."
        class="flex-1 p-4 rounded-xl bg-[#1F2937] text-white outline-none border border-transparent focus:border-purple-500"
      />

      <select
        v-model="priority"
        class="p-4 rounded-xl bg-[#1F2937] text-white outline-none border border-transparent focus:border-purple-500"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        @click="submitTask"
        class="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all px-6 py-4 rounded-xl font-bold shadow-lg shadow-purple-900/30"
      >
        Add Task 💜
      </button>
    </div>

    <p v-if="errorMessage" class="text-pink-400 mt-4">
      {{ errorMessage }}
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  errorMessage: String,
});

const emit = defineEmits(["add-task"]);

const title = ref("");
const priority = ref("Low");

const submitTask = () => {
  if (!title.value.trim()) {
    return;
  }

  emit("add-task", {
    title: title.value,
    priority: priority.value,
  });

  title.value = "";
  priority.value = "Low";
};
</script>