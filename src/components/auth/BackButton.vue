<template>
  <button
    data-testid="test-back-button"
    id="back-home-button"
    type="button"
    @click="goHome"
    @keydown="handleKeyDown"
    class="fixed top-5 left-5 z-50 bg-foreground rounded-md py-2 px-5 text-primary text-sm flex items-center gap-2 cursor-pointer hover:bg-foreground/90 transition-all duration-150 ease-in"
    role="button"
    aria-label="Go back to home page"
    aria-pressed="false"
    tabindex="0"
  >
    <ArrowLeft
      data-testid="test-back-icon"
      aria-hidden="true"
      focusable="false"
      class="w-4 h-4"
    />
    <span data-testid="test-back-text" aria-hidden="false">Back Home</span>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";

const router = useRouter();

function goHome() {
  router.push("/");
}

function handleKeyDown(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    goHome();
  }
}
</script>
