<template>
  <div class="w-full">
    <h3 class="text-3xl font-bold text-center text-weather-primary">Login</h3>
    <div v-if="error" class="error bg-red-500">{{ error }}</div>
    <form class="box-border" @submit.prevent="onLogin()">
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
          Remember me
        </label>
        <a
          href="#"
          class="font-semibold text-weather-primary no-underline hover:underline"
          >Forgot Password?</a
        >
      </div>

      <button
        class="w-full p-3 mt-4 rounded-md bg-weather-primary hover:bg-weather-secondary text-white font-semibold text-xl hover:shadow-xl transition-all duration-300 ease-in-out"
        type="submit"
      >
        Login
      </button>
      <div class="mt-4 text-center">
        <p class="font-medium text-weather-primary">
          Don't have an account?
          <a
            href="#"
            class="text-weather-secondary underline hover:no-underline"
            @click="Register"
          >
            Register
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
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
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
      login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onLogin() {
      let validations = new SignupValidations(this.email, this.password);

      this.errors = validations.checkValidations();
      if (this.errors.length) {
        return false;
      }
      this.error = "";

      this.showLoading(true);
      //Login check
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
      } catch (e) {
        this.error = e;
        this.showLoading(false);
      }
      this.showLoading(false);
      this.$router.push("/posts");
    },

    Register() {
      this.openRegistrationModal();
    },
  },
};
</script>
