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
      <div class="lg:col-span-2 bg-[#111827] border border-purple-500/20 rounded-3xl p-6 shadow-2xl shadow-purple-950/20">
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
            @click="handleAddTask"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all px-6 py-4 rounded-xl font-bold shadow-lg shadow-purple-900/30"
          >
            Add Task 💜
          </button>
        </div>

        <p v-if="taskStore.errorMessage" class="text-pink-400 mt-4">
          {{ taskStore.errorMessage }}
        </p>
      </div>

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
          {{ completedTasks.length }} of {{ taskStore.tasks.length }} missions completed.
        </p>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-[#111827] rounded-3xl p-6 border border-purple-500/20">
        <p class="text-gray-400">Total Tasks</p>
        <h3 class="text-4xl font-bold text-purple-300">
          {{ taskStore.tasks.length }}
        </h3>
      </div>

      <div class="bg-[#111827] rounded-3xl p-6 border border-yellow-500/20">
        <p class="text-gray-400">Pending</p>
        <h3 class="text-4xl font-bold text-yellow-300">
          {{ pendingTasks.length }}
        </h3>
      </div>

      <div class="bg-[#111827] rounded-3xl p-6 border border-green-500/20">
        <p class="text-gray-400">Completed</p>
        <h3 class="text-4xl font-bold text-green-300">
          {{ completedTasks.length }}
        </h3>
      </div>
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
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="bg-[#111827] border border-purple-500/20 rounded-2xl p-5 shadow-lg shadow-purple-950/20"
          :class="{ 'opacity-75': task.completed }"
        >
          <div v-if="editingTaskId === task.id" class="space-y-3">
            <input
              v-model="editTitle"
              type="text"
              class="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none border border-purple-500/30"
            />

            <select
              v-model="editPriority"
              class="w-full p-3 rounded-xl bg-[#1F2937] text-white outline-none border border-purple-500/30"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <div class="flex gap-2">
              <button
                @click="saveEdit(task.id)"
                class="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                @click="cancelEdit"
                class="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>

          <div v-else>
            <div class="flex justify-between items-start gap-4 mb-4">
              <div>
                <span
                  class="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                  :class="priorityClass(task.priority)"
                >
                  {{ task.priority }}
                </span>

                <h3
                  class="text-xl font-bold"
                  :class="{ 'line-through text-gray-400': task.completed }"
                >
                  {{ task.title }}
                </h3>

                <p class="text-sm mt-2" :class="task.completed ? 'text-green-300' : 'text-purple-300'">
                  {{ task.completed ? "Completed mission 💫" : "Pending mission 🌙" }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                @click="startEdit(task)"
                class="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                v-if="!task.completed"
                @click="taskStore.toggleTask(task)"
                class="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
              >
                Done
              </button>

              <button
                v-else
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
const currentFilter = ref("all");

const editingTaskId = ref(null);
const editTitle = ref("");
const editPriority = ref("Low");

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

const handleAddTask = async () => {
  if (!title.value.trim()) {
    return;
  }

  await taskStore.addTask(title.value, priority.value);

  title.value = "";
  priority.value = "Low";
};

const startEdit = (task) => {
  editingTaskId.value = task.id;
  editTitle.value = task.title;
  editPriority.value = task.priority;
};

const cancelEdit = () => {
  editingTaskId.value = null;
  editTitle.value = "";
  editPriority.value = "Low";
};

const saveEdit = async (taskId) => {
  if (!editTitle.value.trim()) {
    return;
  }

  await taskStore.updateTask(
    taskId,
    editTitle.value,
    editPriority.value
  );

  cancelEdit();
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};

const priorityClass = (taskPriority) => {
  if (taskPriority === "High") {
    return "bg-pink-500/20 text-pink-300 border border-pink-500/30";
  }

  if (taskPriority === "Medium") {
    return "bg-purple-500/20 text-purple-300 border border-purple-500/30";
  }

  return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
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