<template>
  <main
    data-testid="test-signup-page"
    class="relative min-h-screen flex items-center justify-center"
  >
    <!-- button to go back to home page -->
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

    <!-- sign up form -->
    <section
      data-testid="test-signup-form-container"
      class="w-full max-w-2xl bg-foreground/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-foreground/20"
    >
      <!-- heading -->
      <div data-testid="test-signup-heading" class="text-center mb-8">
        <h1
          data-testid="test-signup-heading-text"
          class="text-3xl font-bold text-foreground mb-2"
        >
          Create Account
        </h1>
        <p class="text-foreground/70">Sign up to get started with Ticket Zen</p>
      </div>

      <!-- form -->
      <form
        data-testid="test-signup-form"
        @submit.prevent="handleSubmit"
        class="space-y-6"
      >
        <!-- Name field -->
        <div data-testid="test-name-container">
          <label
            data-testid="test-name-label"
            for="name"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Full Name
          </label>

          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <User
                class="h-5 w-5 text-foreground/50"
                data-testid="test-user-icon"
              />
            </div>
            <input
              data-testid="test-name-input"
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              v-model="formData.name"
              :class="[
                'w-full pl-10 pr-3 py-3 rounded-lg bg-foreground/20 border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all',
                errors.name ? 'border-red-500' : 'border-foreground/30',
              ]"
            />
          </div>
          <p
            v-if="errors.name"
            data-testid="test-name-error"
            class="mt-1 text-sm text-red-400"
          >
            {{ errors.name }}
          </p>
        </div>

        <!-- Email field -->
        <div data-testid="test-email-container">
          <label
            data-testid="test-email-label"
            for="email"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Email Address
          </label>

          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Mail
                data-testid="test-mail-icon"
                class="h-5 w-5 text-foreground/50"
              />
            </div>
            <input
              data-testid="test-email-input"
              id="email"
              type="email"
              name="email"
              v-model="formData.email"
              placeholder="johndoe@example.com"
              :class="[
                'w-full pl-10 pr-3 py-3 rounded-lg bg-foreground/20 border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all',
                errors.email ? 'border-red-500' : 'border-foreground/30',
              ]"
            />
          </div>
          <p
            v-if="errors.email"
            data-testid="test-email-error"
            class="mt-1 text-sm text-red-400"
          >
            {{ errors.email }}
          </p>
        </div>

        <!-- Password field -->
        <div data-testid="test-password-container">
          <label
            data-testid="test-password-label"
            for="password"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Password
          </label>

          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Lock
                data-testid="test-lock-icon"
                class="h-5 w-5 text-foreground/50"
              />
            </div>

            <input
              data-testid="test-password-input"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              v-model="formData.password"
              :class="[
                'w-full pl-10 pr-10 py-3 rounded-lg bg-foreground/20 border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all',
                errors.password ? 'border-red-500' : 'border-foreground/30',
              ]"
              placeholder="Password"
            />
            <button
              data-testid="test-show-password-button"
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="showPassword = !showPassword"
            >
              <EyeOff
                v-if="showPassword"
                data-testid="test-hide-password-icon"
                class="h-5 w-5 text-foreground/50"
              />
              <Eye
                v-else
                data-testid="test-show-password-icon"
                class="h-5 w-5 text-foreground/50"
              />
            </button>
          </div>
          <p
            v-if="errors.password"
            data-testid="test-password-error"
            class="mt-1 text-sm text-red-400"
          >
            {{ errors.password }}
          </p>
        </div>

        <!-- confirm password -->
        <div data-testid="test-confirm-password-container">
          <label
            data-testid="test-password-label"
            for="confirmPassword"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Confirm Password
          </label>

          <div data-testid="test-confirm-password-container" class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Lock
                data-testid="test-lock-icon"
                class="h-5 w-5 text-foreground/50"
              />
            </div>
            <input
              data-testid="test-confirm-password-input"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              name="confirmPassword"
              v-model="formData.confirmPassword"
              :class="[
                'w-full pl-10 pr-10 py-3 rounded-lg bg-foreground/20 border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all',
                errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-foreground/30',
              ]"
              placeholder="Confirm Password"
            />
            <button
              data-testid="test-show-confirm-password-button"
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <EyeOff
                v-if="showConfirmPassword"
                data-testid="test-hide-confirm-password-icon"
                class="h-5 w-5 text-foreground/50"
              />
              <Eye
                v-else
                data-testid="test-show-confirm-password-icon"
                class="h-5 w-5 text-foreground/50"
              />
            </button>
          </div>
          <p
            v-if="errors.confirmPassword"
            data-testid="test-confirm-password-error"
            class="mt-1 text-sm text-red-400"
          >
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- terms of service info -->
        <p
          data-testid="test-terms-of-service-info"
          class="mt-4 text-center text-foreground/50 text-xs"
        >
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <!-- submit button -->
        <button
          type="submit"
          data-testid="test-submit-button"
          :disabled="isSubmitting"
          class="w-full bg-secondary text-primary py-3 rounded-lg font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? "Creating Account..." : "Sign Up" }}
        </button>
      </form>

      <div data-testid="test-login-link" class="mt-6 text-center">
        <p class="text-foreground/70">
          Already have an account?
          <router-link
            to="/auth/login"
            class="font-medium text-secondary hover:text-secondary/80 transition-colors ml-1.5"
          >
            Log in
          </router-link>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import BackButton from "../components/auth/BackButton.vue";

const router = useRouter();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = ref({});
const isSubmitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Validate form data
const validateForm = (data) => {
  const { name, email, password, confirmPassword } = data;
  const newErrors = {};

  // === Name validation ===
  if (!name.trim()) {
    newErrors.name = "Full name is required";
  } else {
    // Split the name by spaces
    const parts = name.trim().split(/\s+/);

    // Check first name length
    if (parts[0].length < 2) {
      newErrors.name = "First name must be at least 2 letters";
    }
    // Check that there's a last name
    else if (parts.length < 2) {
      newErrors.name = "Please enter your last name too";
    }
    //  ensure both parts are alphabetic
    else if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(name.trim())) {
      newErrors.name = "Name must contain only letters and a space";
    }
  }

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
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    newErrors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }

  // Confirm password validation
  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
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
    // save to local storage
    const userToSave = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("user", JSON.stringify(userToSave));
    localStorage.setItem("isAuthenticated", JSON.stringify(true));

    isSubmitting.value = false;

    // You'll need to add a toast library for Vue like vue-toastification
    // For now, you can use console.log or implement your own toast
    console.log("Account created successfully!");

    router.push("/dashboard");
  }, 1000);
};
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
