<template>
  <div>
    <Navbar />
    <main className="max-w-[1440px] mx-auto mt-20 bg-foreground text-primary">
      <Hero />
      <Features />
      <Testimonial />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/landing-page/Header.vue";

import Hero from "../components/landing-page/Hero.vue";

import Features from "../components/landing-page/Features.vue";

import Testimonial from "../components/landing-page/Testimonial.vue";

import Footer from "../components/landing-page/Footer.vue";
</script>

<style scoped></style>
