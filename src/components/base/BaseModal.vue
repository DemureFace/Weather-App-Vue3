<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-10 bg-white bg-opacity-90 backdrop-blur shadow-xl self-start rounded-2xl border-4 border-white mt-32"
          >
            <slot />

            <BaseButton class="py-2 px-6 mt-4" @click="$emit('close-modal')">
              Close
            </BaseButton>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.5s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.5s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.5s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
