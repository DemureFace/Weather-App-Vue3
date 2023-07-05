<template>
  <div class="w-80">
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
        <BaseButton tag="a" class="font-semibold">Forgot Password?</BaseButton>
      </div>

      <BaseButton class="w-full p-3 mt-4 font-semibold text-xl">
        Login
      </BaseButton>

      <div class="mt-4 text-center">
        <p class="font-medium text-weather-primary">
          Don't have an account?

          <BaseButton tag="a" @click="$emit('change-modal', 'signup')">
            Register
          </BaseButton>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import SignupValidations from "@/services/SignupValidations";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
} from "@/store/storeconstants";

export default {
  components: {
    BaseInput,
    BaseButton,
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
  },
};
</script>
