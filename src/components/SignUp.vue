<template>
  <div>
    <h3 class="text-3xl font-bold text-center text-weather-primary">
      Registration
    </h3>
    <div v-if="error" class="error bg-red-500">{{ error }}</div>
    <form @submit.prevent="onSignup()">
      <BaseInput
        icon="fa-user"
        v-model:inputValue="username"
        id="username"
        label="Username"
        type="username"
        :error="errors.username"
      />

      <BaseInput
        icon="fa-envelope"
        v-model:inputValue="email"
        id="email"
        label="Email"
        type="email"
        :error="errors.email"
      />

      <BaseInput
        icon="fa-lock"
        v-model:inputValue="password"
        id="password"
        label="Password"
        type="password"
        :error="errors.password"
      />

      <div class="flex justify-between mt-4">
        <label class="text-base">
          <input type="checkbox" id="checkbox" />
          I agree to the terms & conditions
        </label>
      </div>

      <button
        type="submit"
        class="w-full p-3 mt-4 rounded-md bg-weather-primary hover:bg-weather-secondary text-white font-semibold text-xl hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        Register
      </button>

      <div class="mt-4 text-center">
        <p class="font-medium text-weather-primary">
          Already have an account?
          <a
            href="#"
            class="text-weather-secondary underline hover:no-underline"
            @click="Login"
          >
            Login
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import SignupValidations from "@/services/SignupValidations";
import BaseInput from "@/components/base/BaseInput.vue";
import {
  SIGNUP_ACTION,
  LOADING_SPINNER_SHOW_MUTATION,
} from "@/store/storeconstants";

export default {
  components: {
    BaseInput,
    SignupValidations,
  },

  data() {
    return {
      email: "",
      password: "",
      errors: [],
      error: "",
    };
  },

  props: {
    openRegistrationModal: {
      type: Function,
      required: true,
    },
  },

  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),

    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),

    async onSignup() {
      let validations = new SignupValidations(this.email, this.password);

      this.errors = validations.checkValidations();
      if ("email" in this.errors || "password" in this.errors) {
        return false;
      }

      this.showLoading(true);

      await this.signup({
        email: this.email,
        password: this.password,
      }).catch((error) => {
        this.error = error;
        this.showLoading(false);
      });
      this.showLoading(false);
    },

    Login() {
      this.openRegistrationModal();
    },
  },
};
</script>
