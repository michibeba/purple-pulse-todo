import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../services/supabase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  // SIGN UP
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return error.message;
    }

    user.value = data.user;
    return null;
  };

  // LOGIN
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return error.message;
    }

    user.value = data.user;
    return null;
  };

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  // CHECK SESSION
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();

    user.value = data.user;
  };

  return {
    user,
    signUp,
    login,
    logout,
    fetchUser,
  };
});