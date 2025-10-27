<template>
  <div>
    <Navbar />
    <main className="max-w-[1440px] mx-auto mt-20 bg-foreground text-primary">
      <Hero />
      <Features />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/landing-page/Navbar.vue";

import Hero from "../components/landing-page/Hero.vue";

import Features from "../components/landing-page/Features.vue";

import Footer from "../components/landing-page/Footer.vue";
</script>

<style scoped></style>
