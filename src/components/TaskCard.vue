<template>
  <div
    class="bg-[#111827] border border-purple-500/20 rounded-2xl p-5 shadow-lg shadow-purple-950/20"
    :class="{ 'opacity-75': task.completed }"
  >
    <div v-if="isEditing" class="space-y-3">
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
          @click="saveEdit"
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

          <p
            class="text-sm mt-2"
            :class="task.completed ? 'text-green-300' : 'text-purple-300'"
          >
            {{ task.completed ? "Completed mission 💫" : "Pending mission 🌙" }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          @click="startEdit"
          class="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          v-if="!task.completed"
          @click="$emit('toggle-task', task)"
          class="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
        >
          Done
        </button>

        <button
          v-else
          @click="$emit('toggle-task', task)"
          class="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg"
        >
          Undo
        </button>

        <button
          @click="$emit('delete-task', task.id)"
          class="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  task: Object,
});

const emit = defineEmits([
  "toggle-task",
  "delete-task",
  "save-edit",
]);

const isEditing = ref(false);
const editTitle = ref("");
const editPriority = ref("Low");

const startEdit = () => {
  isEditing.value = true;
  editTitle.value = props.task.title;
  editPriority.value = props.task.priority;
};

const cancelEdit = () => {
  isEditing.value = false;
  editTitle.value = "";
  editPriority.value = "Low";
};

const saveEdit = () => {
  if (!editTitle.value.trim()) {
    return;
  }

  emit("save-edit", {
    id: props.task.id,
    title: editTitle.value,
    priority: editPriority.value,
  });

  cancelEdit();
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
</script>