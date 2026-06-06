<template>
  <section
    class="relative overflow-hidden bg-[#111827] border border-purple-500/20 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/20"
  >
    <div class="absolute -top-16 -right-12 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-16 -left-12 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>

    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      <div class="lg:col-span-2">
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

      <div class="hidden lg:flex justify-center">
        <div
          class="relative w-64 h-48 rounded-3xl border border-purple-300/20 overflow-hidden shadow-2xl shadow-purple-900/30 visual-card"
          :class="quotes[currentIndex].visual.bg"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_35%)]"></div>

          <div class="absolute top-6 left-7 text-4xl floating-slow">
            {{ quotes[currentIndex].visual.iconOne }}
          </div>

          <div class="absolute top-8 right-8 text-3xl floating-fast">
            {{ quotes[currentIndex].visual.iconTwo }}
          </div>

          <div class="absolute bottom-7 left-10 text-3xl floating-fast">
            {{ quotes[currentIndex].visual.iconThree }}
          </div>

          <div class="absolute bottom-8 right-9 text-4xl floating-slow">
            {{ quotes[currentIndex].visual.iconFour }}
          </div>

          <div
            class="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl pulse-orb"
            :class="quotes[currentIndex].visual.orb"
          ></div>

          <div class="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-200/40 flex items-center justify-center">
            <span class="text-3xl">
              {{ quotes[currentIndex].visual.center }}
            </span>
          </div>

          <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111827] to-transparent"></div>
        </div>
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
    visual: {
      bg: "bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-blue-500/20",
      orb: "bg-purple-400/30",
      center: "⚔️",
      iconOne: "🌙",
      iconTwo: "✨",
      iconThree: "💜",
      iconFour: "⭐",
    },
  },
  {
    text: "You are your own galaxy.",
    subtext: "Glow at your own pace. Progress does not have to look the same every day.",
    visual: {
      bg: "bg-gradient-to-br from-indigo-600/30 via-purple-500/20 to-pink-500/20",
      orb: "bg-indigo-400/30",
      center: "🌌",
      iconOne: "🪐",
      iconTwo: "⭐",
      iconThree: "✨",
      iconFour: "🌙",
    },
  },
  {
    text: "Main character energy starts with showing up.",
    subtext: "Open the dashboard, choose one mission, and move one step forward.",
    visual: {
      bg: "bg-gradient-to-br from-pink-600/30 via-purple-500/20 to-orange-500/20",
      orb: "bg-pink-400/30",
      center: "🎬",
      iconOne: "✨",
      iconTwo: "💫",
      iconThree: "💜",
      iconFour: "🌟",
    },
  },
  {
    text: "Even the moon has phases.",
    subtext: "Some days are for big wins. Some days are for gentle progress.",
    visual: {
      bg: "bg-gradient-to-br from-slate-700/40 via-purple-600/20 to-blue-600/20",
      orb: "bg-blue-300/30",
      center: "🌙",
      iconOne: "🌘",
      iconTwo: "🌕",
      iconThree: "✨",
      iconFour: "🌌",
    },
  },
  {
    text: "Small progress is still progress.",
    subtext: "One tiny mission completed today still moves you closer to your goal.",
    visual: {
      bg: "bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-cyan-500/20",
      orb: "bg-fuchsia-400/30",
      center: "🌱",
      iconOne: "💜",
      iconTwo: "✨",
      iconThree: "🌿",
      iconFour: "⭐",
    },
  },
  {
    text: "Protect your peace, then build your dream.",
    subtext: "Your productivity should support you, not pressure you.",
    visual: {
      bg: "bg-gradient-to-br from-blue-600/30 via-purple-500/20 to-teal-500/20",
      orb: "bg-teal-300/30",
      center: "🫧",
      iconOne: "🌙",
      iconTwo: "💜",
      iconThree: "✨",
      iconFour: "🕊️",
    },
  },
  {
    text: "A soft start is still a start.",
    subtext: "You do not need perfect energy to make meaningful progress.",
    visual: {
      bg: "bg-gradient-to-br from-rose-600/25 via-purple-500/20 to-yellow-500/20",
      orb: "bg-rose-300/30",
      center: "☁️",
      iconOne: "🌸",
      iconTwo: "✨",
      iconThree: "💜",
      iconFour: "🌙",
    },
  },
  {
    text: "Your purple era begins with one task.",
    subtext: "Choose a mission, press start, and let the glow follow.",
    visual: {
      bg: "bg-gradient-to-br from-purple-700/40 via-violet-500/20 to-pink-500/20",
      orb: "bg-purple-300/40",
      center: "💜",
      iconOne: "🔮",
      iconTwo: "✨",
      iconThree: "🌙",
      iconFour: "💫",
    },
  },
  {
    text: "You do not need to rush your bloom.",
    subtext: "Growth is still growth, even when it happens quietly.",
    visual: {
      bg: "bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-green-500/20",
      orb: "bg-pink-300/30",
      center: "🌷",
      iconOne: "🌸",
      iconTwo: "🌙",
      iconThree: "✨",
      iconFour: "💜",
    },
  },
  {
    text: "One completed mission can change the mood of the whole day.",
    subtext: "Start with the task that feels kindest to your future self.",
    visual: {
      bg: "bg-gradient-to-br from-yellow-500/20 via-purple-500/20 to-pink-500/20",
      orb: "bg-yellow-300/30",
      center: "✅",
      iconOne: "✨",
      iconTwo: "⭐",
      iconThree: "💜",
      iconFour: "🌙",
    },
  },
  {
    text: "Your focus is a lightstick in the dark.",
    subtext: "Let it guide you through one small step at a time.",
    visual: {
      bg: "bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-pink-500/20",
      orb: "bg-purple-200/40",
      center: "🔦",
      iconOne: "💜",
      iconTwo: "✨",
      iconThree: "🌙",
      iconFour: "⭐",
    },
  },
  {
    text: "Today does not need perfection. It needs presence.",
    subtext: "Show up gently, then let the next action become clearer.",
    visual: {
      bg: "bg-gradient-to-br from-sky-600/25 via-purple-500/20 to-indigo-500/20",
      orb: "bg-sky-300/30",
      center: "🧘",
      iconOne: "🌙",
      iconTwo: "☁️",
      iconThree: "✨",
      iconFour: "💜",
    },
  },
  {
    text: "Every hero has low-energy chapters.",
    subtext: "Rest, reset, and return to the mission when you can.",
    visual: {
      bg: "bg-gradient-to-br from-gray-600/30 via-purple-500/20 to-blue-500/20",
      orb: "bg-blue-300/25",
      center: "🛡️",
      iconOne: "🌙",
      iconTwo: "⭐",
      iconThree: "💤",
      iconFour: "✨",
    },
  },
  {
    text: "Progress can be quiet and still be powerful.",
    subtext: "Not every win needs to be loud to matter.",
    visual: {
      bg: "bg-gradient-to-br from-violet-600/25 via-slate-500/20 to-pink-500/20",
      orb: "bg-violet-300/30",
      center: "🤍",
      iconOne: "✨",
      iconTwo: "🌙",
      iconThree: "💜",
      iconFour: "💫",
    },
  },
  {
    text: "Build your dream like a playlist.",
    subtext: "One track, one task, one moment of focus at a time.",
    visual: {
      bg: "bg-gradient-to-br from-fuchsia-600/30 via-purple-500/20 to-blue-500/20",
      orb: "bg-fuchsia-300/30",
      center: "🎧",
      iconOne: "🎵",
      iconTwo: "✨",
      iconThree: "💜",
      iconFour: "🌙",
    },
  },
  {
    text: "Your comeback starts with the next click.",
    subtext: "Choose one mission and let today become lighter.",
    visual: {
      bg: "bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/25",
      orb: "bg-orange-300/30",
      center: "🚀",
      iconOne: "✨",
      iconTwo: "🌟",
      iconThree: "💜",
      iconFour: "💫",
    },
  },
  {
    text: "You are allowed to make the path softer.",
    subtext: "Productivity works best when it respects your energy.",
    visual: {
      bg: "bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-pink-500/20",
      orb: "bg-teal-300/30",
      center: "🪷",
      iconOne: "🌙",
      iconTwo: "✨",
      iconThree: "💜",
      iconFour: "☁️",
    },
  },
  {
    text: "A glowing dashboard needs a glowing user.",
    subtext: "Take care of yourself while you take care of your goals.",
    visual: {
      bg: "bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-yellow-500/20",
      orb: "bg-pink-300/40",
      center: "🌟",
      iconOne: "✨",
      iconTwo: "💜",
      iconThree: "🌙",
      iconFour: "⭐",
    },
  },
  {
    text: "The mission is not to do everything.",
    subtext: "The mission is to keep moving with care.",
    visual: {
      bg: "bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-slate-500/20",
      orb: "bg-indigo-300/30",
      center: "🗺️",
      iconOne: "🌙",
      iconTwo: "✨",
      iconThree: "💜",
      iconFour: "📍",
    },
  },
  {
    text: "When the progress bar reaches 100%, celebrate it.",
    subtext: "Small victories deserve sparkle too.",
    visual: {
      bg: "bg-gradient-to-br from-pink-500/30 via-purple-500/25 to-yellow-500/20",
      orb: "bg-yellow-300/40",
      center: "🎉",
      iconOne: "✨",
      iconTwo: "💫",
      iconThree: "💜",
      iconFour: "⭐",
    },
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

<style scoped>
.visual-card {
  transition: background 0.4s ease, transform 0.3s ease;
}

.visual-card:hover {
  transform: translateY(-4px) scale(1.02);
}

.floating-slow {
  animation: floatingSlow 4s ease-in-out infinite alternate;
}

.floating-fast {
  animation: floatingFast 2.8s ease-in-out infinite alternate;
}

.pulse-orb {
  animation: pulseOrb 2.5s ease-in-out infinite alternate;
}

@keyframes floatingSlow {
  from {
    transform: translateY(0) rotate(-4deg);
  }

  to {
    transform: translateY(-10px) rotate(6deg);
  }
}

@keyframes floatingFast {
  from {
    transform: translateY(0) scale(1);
  }

  to {
    transform: translateY(-8px) scale(1.12);
  }
}

@keyframes pulseOrb {
  from {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.9);
  }

  to {
    opacity: 0.95;
    transform: translate(-50%, -50%) scale(1.15);
  }
}
</style>