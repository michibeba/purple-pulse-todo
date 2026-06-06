<template>
  <section
    class="relative overflow-hidden bg-[#111827] border border-purple-500/20 rounded-3xl p-6 shadow-2xl shadow-purple-950/20"
  >
    <div class="absolute -top-16 -right-12 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-16 -left-12 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>

    <div class="relative z-10">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-2xl">🌙</span>

        <p class="text-purple-300 text-sm uppercase tracking-[0.3em]">
          Today’s Pulse
        </p>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
        {{ quotes[currentIndex].text }}
      </h2>

      <p class="text-gray-400 mb-6 max-w-3xl">
        {{ quotes[currentIndex].subtext }}
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="changeQuote"
          class="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/30 hover:scale-105"
        >
          New Pulse ✨
        </button>

        <button
          @click="randomQuote"
          class="bg-[#1F2937] hover:bg-[#273449] px-5 py-3 rounded-xl font-bold transition-all border border-purple-500/20"
        >
          Surprise Me 💫
        </button>

        <span class="text-sm text-gray-500">
          {{ currentIndex + 1 }} / {{ quotes.length }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const currentIndex = ref(0);

const quotes = [
  {
    text: "Your training arc starts today.",
    subtext: "Pick one mission, begin gently, and let momentum build from there.",
  },
  {
    text: "You are your own galaxy.",
    subtext: "Glow at your own pace. Progress does not have to look the same every day.",
  },
  {
    text: "Main character energy starts with showing up.",
    subtext: "Open the dashboard, choose one mission, and move one step forward.",
  },
  {
    text: "Even the moon has phases.",
    subtext: "Some days are for big wins. Some days are for gentle progress.",
  },
  {
    text: "Small progress is still progress.",
    subtext: "One tiny mission completed today still moves you closer to your goal.",
  },
  {
    text: "Protect your peace, then build your dream.",
    subtext: "Your productivity should support you, not pressure you.",
  },
  {
    text: "A soft start is still a start.",
    subtext: "You do not need perfect energy to make meaningful progress.",
  },
  {
    text: "Your purple era begins with one task.",
    subtext: "Choose a mission, press start, and let the glow follow.",
  },
  {
    text: "You do not need to rush your bloom.",
    subtext: "Growth is still growth, even when it happens quietly.",
  },
  {
    text: "One completed mission can change the mood of the whole day.",
    subtext: "Start with the task that feels kindest to your future self.",
  },
  {
    text: "Your focus is a lightstick in the dark.",
    subtext: "Let it guide you through one small step at a time.",
  },
  {
    text: "Today does not need perfection. It needs presence.",
    subtext: "Show up gently, then let the next action become clearer.",
  },
  {
    text: "Every hero has low-energy chapters.",
    subtext: "Rest, reset, and return to the mission when you can.",
  },
  {
    text: "Progress can be quiet and still be powerful.",
    subtext: "Not every win needs to be loud to matter.",
  },
  {
    text: "Build your dream like a playlist.",
    subtext: "One track, one task, one moment of focus at a time.",
  },
  {
    text: "Your comeback starts with the next click.",
    subtext: "Choose one mission and let today become lighter.",
  },
  {
    text: "You are allowed to make the path softer.",
    subtext: "Productivity works best when it respects your energy.",
  },
  {
    text: "A glowing dashboard needs a glowing user.",
    subtext: "Take care of yourself while you take care of your goals.",
  },
  {
    text: "The mission is not to do everything.",
    subtext: "The mission is to keep moving with care.",
  },
  {
    text: "When the progress bar reaches 100%, celebrate it.",
    subtext: "Small victories deserve sparkle too.",
  },
];

const changeQuote = () => {
  currentIndex.value = currentIndex.value + 1;

  if (currentIndex.value >= quotes.length) {
    currentIndex.value = 0;
  }
};

const randomQuote = () => {
  let newIndex = Math.floor(Math.random() * quotes.length);

  if (quotes.length > 1) {
    while (newIndex === currentIndex.value) {
      newIndex = Math.floor(Math.random() * quotes.length);
    }
  }

  currentIndex.value = newIndex;
};
</script>