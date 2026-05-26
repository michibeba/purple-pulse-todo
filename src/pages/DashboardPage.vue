<template>
  <div class="min-h-screen bg-[#050816] text-white p-10">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-6xl font-bold text-purple-400">
          Dashboard ✨
        </h1>
        <p class="text-gray-400 mt-2">
          Your anime productivity hub.
        </p>
      </div>

      <button
        @click="handleLogout"
        class="bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-xl font-bold transition-all"
      >
        Logout
      </button>
    </header>

    <section class="bg-[#111827] border border-purple-500/20 rounded-3xl p-6 mb-10">
      <h2 class="text-2xl font-bold text-purple-300 mb-4">
        Add a new mission 💜
      </h2>

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
          @click="handleAddTask"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all px-6 py-4 rounded-xl font-bold"
        >
          Add Task 💜
        </button>
      </div>

      <p v-if="taskStore.errorMessage" class="text-pink-400 mt-4">
        {{ taskStore.errorMessage }}
      </p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-[#111827] rounded-3xl p-6 border border-purple-500/20">
        <p class="text-gray-400">Total Tasks</p>
        <h3 class="text-4xl font-bold text-purple-300">
          {{ taskStore.tasks.length }}
        </h3>
      </div>

      <div class="bg-[#111827] rounded-3xl p-6 border border-purple-500/20">
        <p class="text-gray-400">Pending</p>
        <h3 class="text-4xl font-bold text-yellow-300">
          {{ pendingTasks.length }}
        </h3>
      </div>

      <div class="bg-[#111827] rounded-3xl p-6 border border-purple-500/20">
        <p class="text-gray-400">Completed</p>
        <h3 class="text-4xl font-bold text-green-300">
          {{ completedTasks.length }}
        </h3>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-3xl font-bold text-purple-300 mb-4">
          To Do 🌙
        </h2>

        <div v-if="pendingTasks.length === 0" class="text-gray-500">
          No pending missions yet.
        </div>

        <div
          v-for="task in pendingTasks"
          :key="task.id"
          class="bg-[#111827] border border-purple-500/20 rounded-2xl p-5 mb-4"
        >
          <div class="flex justify-between items-start gap-4">
            <div>
              <h3 class="text-xl font-bold">
                {{ task.title }}
              </h3>

              <p class="text-sm text-purple-300 mt-1">
                Priority: {{ task.priority }}
              </p>
            </div>

            <div class="flex gap-2">
              <button
                @click="taskStore.toggleTask(task)"
                class="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
              >
                Done
              </button>

              <button
                @click="taskStore.deleteTask(task.id)"
                class="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-3xl font-bold text-pink-300 mb-4">
          Completed ✨
        </h2>

        <div v-if="completedTasks.length === 0" class="text-gray-500">
          No completed missions yet.
        </div>

        <div
          v-for="task in completedTasks"
          :key="task.id"
          class="bg-[#111827] border border-pink-500/20 rounded-2xl p-5 mb-4 opacity-80"
        >
          <div class="flex justify-between items-start gap-4">
            <div>
              <h3 class="text-xl font-bold line-through text-gray-400">
                {{ task.title }}
              </h3>

              <p class="text-sm text-pink-300 mt-1">
                Completed mission 💫
              </p>
            </div>

            <div class="flex gap-2">
              <button
                @click="taskStore.toggleTask(task)"
                class="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg"
              >
                Undo
              </button>

              <button
                @click="taskStore.deleteTask(task.id)"
                class="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/tasks";
import { useAuthStore } from "../stores/auth";

const title = ref("");
const priority = ref("Low");

const taskStore = useTaskStore();
const authStore = useAuthStore();
const router = useRouter();

const pendingTasks = computed(() => {
  return taskStore.tasks.filter((task) => !task.completed);
});

const completedTasks = computed(() => {
  return taskStore.tasks.filter((task) => task.completed);
});

const handleAddTask = async () => {
  if (!title.value.trim()) {
    return;
  }

  await taskStore.addTask(title.value, priority.value);

  title.value = "";
  priority.value = "Low";
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>