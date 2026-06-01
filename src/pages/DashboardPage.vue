<template>
  <div class="min-h-screen bg-[#050816] text-white p-6 md:p-10">
    <header class="flex flex-col md:flex-row justify-between gap-6 md:items-center mb-10">
      <div>
        <p class="text-purple-300 text-sm uppercase tracking-[0.35em] mb-2">
          Purple Pulse
        </p>

        <h1 class="text-5xl md:text-6xl font-bold text-purple-400">
          Dashboard ✨
        </h1>

        <p class="text-gray-400 mt-2">
          Your anime productivity hub.
        </p>
      </div>

      <button
        @click="handleLogout"
        class="bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-pink-900/30"
      >
        Logout
      </button>
    </header>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <div class="lg:col-span-2">
        <TaskForm
          :error-message="taskStore.errorMessage"
          @add-task="handleAddTask"
        />
      </div>

      <ProgressCard
        :progress-percent="progressPercent"
        :completed-count="completedTasks.length"
        :total-count="taskStore.tasks.length"
      />
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatsCard
        label="Total Tasks"
        :value="taskStore.tasks.length"
        text-class="text-purple-300"
        border-class="border-purple-500/20"
      />

      <StatsCard
        label="Pending"
        :value="pendingTasks.length"
        text-class="text-yellow-300"
        border-class="border-yellow-500/20"
      />

      <StatsCard
        label="Completed"
        :value="completedTasks.length"
        text-class="text-green-300"
        border-class="border-green-500/20"
      />
    </section>

    <section class="flex flex-wrap gap-3 mb-8">
      <button
        @click="currentFilter = 'all'"
        :class="filterButtonClass('all')"
      >
        All
      </button>

      <button
        @click="currentFilter = 'pending'"
        :class="filterButtonClass('pending')"
      >
        Pending
      </button>

      <button
        @click="currentFilter = 'completed'"
        :class="filterButtonClass('completed')"
      >
        Completed
      </button>
    </section>

    <section>
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-3xl font-bold text-purple-300">
          Missions 🌙
        </h2>

        <p class="text-gray-500 text-sm">
          Showing {{ filteredTasks.length }} task(s)
        </p>
      </div>

      <div v-if="taskStore.loading" class="text-gray-400">
        Loading missions...
      </div>

      <div
        v-else-if="filteredTasks.length === 0"
        class="bg-[#111827] border border-purple-500/20 rounded-3xl p-10 text-center"
      >
        <h3 class="text-2xl font-bold text-purple-300 mb-2">
          No missions here ✨
        </h3>

        <p class="text-gray-400">
          Add a new task or change the filter to see more missions.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle-task="taskStore.toggleTask"
          @delete-task="taskStore.deleteTask"
          @save-edit="handleEditTask"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/tasks";
import { useAuthStore } from "../stores/auth";

import TaskForm from "../components/TaskForm.vue";
import TaskCard from "../components/TaskCard.vue";
import ProgressCard from "../components/ProgressCard.vue";
import StatsCard from "../components/StatsCard.vue";

const currentFilter = ref("all");

const taskStore = useTaskStore();
const authStore = useAuthStore();
const router = useRouter();

const pendingTasks = computed(() => {
  return taskStore.tasks.filter((task) => !task.completed);
});

const completedTasks = computed(() => {
  return taskStore.tasks.filter((task) => task.completed);
});

const filteredTasks = computed(() => {
  if (currentFilter.value === "pending") {
    return pendingTasks.value;
  }

  if (currentFilter.value === "completed") {
    return completedTasks.value;
  }

  return taskStore.tasks;
});

const progressPercent = computed(() => {
  if (taskStore.tasks.length === 0) {
    return 0;
  }

  return Math.round(
    (completedTasks.value.length / taskStore.tasks.length) * 100
  );
});

const handleAddTask = async (newTask) => {
  await taskStore.addTask(newTask.title, newTask.priority);
};

const handleEditTask = async (updatedTask) => {
  await taskStore.updateTask(
    updatedTask.id,
    updatedTask.title,
    updatedTask.priority
  );
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};

const filterButtonClass = (filterName) => {
  if (currentFilter.value === filterName) {
    return "px-5 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/30";
  }

  return "px-5 py-3 rounded-xl bg-[#111827] text-gray-300 border border-purple-500/20 hover:bg-purple-600/20";
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>