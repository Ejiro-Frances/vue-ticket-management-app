<template>
  <section
    data-testid="test-login-page"
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-primary to-primary/90 p-4 relative overflow-hidden"
  >
    <!-- button to go back home -->
    <BackButton />

    <!-- SVG Background Pattern -->
    <svg
      class="absolute inset-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="oklch(0.985 0 0)"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    <div class="w-full max-w-md relative z-10">
      <div
        class="backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-foreground/20"
      >
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p class="text-foreground/70">Log in to your Ticket zen account</p>
        </div>

        <!-- Login Error Alert -->
        <div
          v-if="loginError"
          class="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start"
        >
          <AlertCircle class="h-5 w-5 text-red-400 mr-2 shrink-0 mt-0.5" />
          <p class="text-sm text-red-400">{{ loginError }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-foreground mb-2"
            >
              Email Address
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Mail class="h-5 w-5 text-foreground/50" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                v-model="formData.email"
                @input="clearFieldError('email')"
                :class="[
                  'w-full pl-10 pr-3 py-3 rounded-lg bg-foreground/20 border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all',
                  errors.email ? 'border-red-500' : 'border-foreground/30',
                ]"
                placeholder="john@example.com"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-400">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Lock class="h-5 w-5 text-foreground/50" />
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                v-model="formData.password"
                @input="clearFieldError('password')"
                :class="[
                  'w-full pl-10 pr-10 py-3 rounded-lg bg-foreground/20 border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all',
                  errors.password ? 'border-red-500' : 'border-foreground/30',
                ]"
                placeholder="Password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <EyeOff
                  v-if="showPassword"
                  class="h-5 w-5 text-foreground/50"
                />
                <Eye v-else class="h-5 w-5 text-foreground/50" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-400">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded bg-foreground/20 border-foreground/30 text-secondary focus:ring-secondary focus:ring-offset-0"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm text-foreground/70"
              >
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-secondary hover:text-secondary/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-secondary text-primary py-3 rounded-lg font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? "Logging In..." : "Log In" }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-foreground/70">
            Don't have an account?
            <router-link
              to="/auth/signup"
              class="ml-1.5 font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              Sign up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-vue-next";
import BackButton from "../components/auth/BackButton.vue";

const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const errors = ref({});
const isSubmitting = ref(false);
const showPassword = ref(false);
const loginError = ref("");

// Validate form data
const validateForm = (data) => {
  const { email, password } = data;
  const newErrors = {};

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Please enter a valid email";
  }

  // Password validation
  if (!password) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};

// Clear field error when user starts typing
const clearFieldError = (field) => {
  if (errors.value[field]) {
    errors.value = { ...errors.value, [field]: "" };
  }

  // Clear login error when user starts typing
  if (loginError.value) {
    loginError.value = "";
  }
};

// Handle form submission
const handleSubmit = () => {
  const newErrors = validateForm(formData);

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors;
    return;
  }

  errors.value = {};
  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    // Get stored user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const singleUser = localStorage.getItem("user");

    // Check if there's a single user (from signup page) or multiple users
    let users = [];
    if (singleUser) {
      users.push(JSON.parse(singleUser));
    }
    users = [...users, ...storedUsers];

    // Find user with matching email
    const user = users.find((u) => u.email === formData.email);

    if (user) {
      // Check if password matches
      if (user.password === formData.password) {
        // Successful login
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          })
        );

        // You'll need to add a toast library for Vue like vue-toastification
        console.log("Welcome back!");

        loginError.value = "";

        // Small delay before redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        // Password doesn't match
        loginError.value = "Invalid email or password";
      }
    } else {
      // User not found
      loginError.value = "Invalid email or password";
    }

    isSubmitting.value = false;
  }, 1000);
};
</script>
