<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleSignup = async () => {
  const error = await authStore.signUp(
    email.value,
    password.value
  );

  if (!error) {
    alert("Account created!");
  } else {
    alert(error);
  }
};

const handleLogin = async () => {
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
</script>

<template>
  <div
    class="min-h-screen bg-[#050816] flex items-center justify-center px-4"
  >
    <div
      class="bg-[#111827] p-10 rounded-3xl w-full max-w-md border border-purple-500/20 shadow-2xl"
    >
      <h1
        class="text-4xl font-bold text-center text-purple-400 mb-2"
      >
        Purple Pulse 💜
      </h1>

      <p class="text-gray-400 text-center mb-8">
        BTS inspired productivity dashboard
      </p>

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

        <button
          @click="handleSignup"
          class="w-full bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-xl font-semibold"
        >
          Sign Up
        </button>

        <button
          @click="handleLogin"
          class="w-full bg-pink-600 hover:bg-pink-700 transition-all p-4 rounded-xl font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>