<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSignupMode = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const switchToSignup = () => {
  isSignupMode.value = true;
  confirmPassword.value = "";
};

const switchToLogin = () => {
  isSignupMode.value = false;
  confirmPassword.value = "";
};

const handleSignup = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    alert("Please fill in email, password, and confirm password.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  const error = await authStore.signUp(
    email.value,
    password.value
  );

  if (!error) {
    alert("Account created! You can now log in.");
    switchToLogin();
  } else {
    alert(error);
  }
};

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Please enter your email and password.");
    return;
  }

  const error = await authStore.login(
    email.value,
    password.value
  );

  if (!error) {
    router.push("/dashboard");
  } else {
    alert(error);
  }
};

const handleSubmit = () => {
  if (isSignupMode.value) {
    handleSignup();
  } else {
    handleLogin();
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-[#050816] flex items-center justify-center px-4 py-10"
  >
    <div
      class="bg-[#111827] p-8 md:p-10 rounded-3xl w-full max-w-md border border-purple-500/20 shadow-2xl shadow-purple-950/30"
    >
      <div class="text-center mb-8">
        <p class="text-purple-300 text-xs uppercase tracking-[0.35em] mb-3">
          Purple Pulse
        </p>

        <h1 class="text-4xl font-bold text-purple-400 mb-2">
          {{ isSignupMode ? "Create Account 💜" : "Welcome Back 💜" }}
        </h1>

        <p class="text-gray-400">
          BTS/anime inspired productivity dashboard
        </p>
      </div>

      <div class="flex bg-[#1F2937] rounded-2xl p-1 mb-6">
        <button
          @click="switchToLogin"
          class="w-1/2 py-3 rounded-xl font-semibold transition-all"
          :class="!isSignupMode ? 'bg-purple-600 text-white' : 'text-gray-400'"
        >
          Login
        </button>

        <button
          @click="switchToSignup"
          class="w-1/2 py-3 rounded-xl font-semibold transition-all"
          :class="isSignupMode ? 'bg-pink-600 text-white' : 'text-gray-400'"
        >
          Sign Up
        </button>
      </div>

      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-4 rounded-xl bg-[#1F2937] text-white outline-none border border-transparent focus:border-purple-500"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-4 rounded-xl bg-[#1F2937] text-white outline-none border border-transparent focus:border-purple-500"
        />

        <input
          v-if="isSignupMode"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="w-full p-4 rounded-xl bg-[#1F2937] text-white outline-none border border-transparent focus:border-purple-500"
        />

        <button
          @click="handleSubmit"
          class="w-full transition-all p-4 rounded-xl font-semibold shadow-lg"
          :class="
            isSignupMode
              ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-900/30'
              : 'bg-purple-600 hover:bg-purple-700 shadow-purple-900/30'
          "
        >
          {{ isSignupMode ? "Create Account" : "Login" }}
        </button>
      </div>

      <div
        class="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4"
      >
        <p class="text-sm text-purple-200 font-semibold mb-1">
          Demo note
        </p>

        <p class="text-xs text-gray-400 leading-relaxed">
          Email confirmation is disabled for this demo because Supabase free email sending is limited during development. User authentication, protected routes, and task storage are still handled through Supabase.
        </p>
      </div>
    </div>
  </div>
</template>