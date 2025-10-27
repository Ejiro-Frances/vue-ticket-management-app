<template>
  <section class="max-w-6xl mx-auto py-20">
    <ul class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <li
        v-for="(feature, index) in featuresData"
        :key="index"
        class="border border-primary rounded-md shadow hover:bg-primary hover:text-foreground hover:shadow-2xl p-10 transition-all duration-200 ease-in"
      >
        <h5 class="font-semibold mb-2">{{ feature.title }}</h5>
        <p class="text-sm">{{ feature.body }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const featuresData = [
  {
    title: "Dashboard",
    body: "At-a-glance metrics for tickets and agent performance.",
  },
  {
    title: "Custom Workflows",
    body: "Create triggers and automations for common ticket flows.",
  },
  { title: "Integrations", body: "" },
];
</script>
