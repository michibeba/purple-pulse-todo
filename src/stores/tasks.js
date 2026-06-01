import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../services/supabase";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([]);
  const loading = ref(false);
  const errorMessage = ref("");

  const fetchTasks = async () => {
    loading.value = true;
    errorMessage.value = "";

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      loading.value = false;
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      errorMessage.value = error.message;
    } else {
      tasks.value = data;
    }

    loading.value = false;
  };

  const addTask = async (title, priority) => {
    errorMessage.value = "";

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      errorMessage.value = "User not logged in";
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      title,
      priority,
      completed: false,
      user_id: user.id,
    });

    if (error) {
      errorMessage.value = error.message;
    } else {
      await fetchTasks();
    }
  };

  const toggleTask = async (task) => {
    errorMessage.value = "";

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      errorMessage.value = error.message;
    } else {
      await fetchTasks();
    }
  };

  const updateTask = async (taskId, newTitle, newPriority) => {
    errorMessage.value = "";

    const { error } = await supabase
      .from("tasks")
      .update({
        title: newTitle,
        priority: newPriority,
      })
      .eq("id", taskId);

    if (error) {
      errorMessage.value = error.message;
    } else {
      await fetchTasks();
    }
  };

  const deleteTask = async (taskId) => {
    errorMessage.value = "";

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      errorMessage.value = error.message;
    } else {
      await fetchTasks();
    }
  };

  return {
    tasks,
    loading,
    errorMessage,
    fetchTasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
  };
});