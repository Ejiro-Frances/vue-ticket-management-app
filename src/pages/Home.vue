<template>
  <div>
    <Navbar />
    <main className="max-w-[1440px] mx-auto mt-20 bg-foreground text-primary">
      <Hero />
      <Features />
      <Testimonial />
      <CTA />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/landing-page/Header.vue";

import Hero from "../components/landing-page/Hero.vue";

import Features from "../components/landing-page/Features.vue";

import Testimonial from "../components/landing-page/Testimonial.vue";

import CTA from "../components/landing-page/CTA.vue";

import Footer from "../components/landing-page/Footer.vue";
</script>

<style scoped></style>
