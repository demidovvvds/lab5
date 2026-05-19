<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay">
      <div class="popup">
        <div class="icon">!</div>

        <h2>Delete?</h2>

        <p>Please ensure and then confirm!</p>

        <div class="buttons">
          <button class="cancel" @click="emit('cancel')">
            No, cancel!
          </button>

          <button class="confirm" @click="emit('confirm')">
            Yes, delete it!
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  width: 360px;
  background: white;
  padding: 30px;
  text-align: center;
  border-radius: 6px;
  font-family: Arial, sans-serif;
}

.icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  border: 3px solid #f3c99b;
  border-radius: 50%;
  color: #f3a44c;
  font-size: 42px;
  line-height: 70px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  border: none;
  padding: 10px 18px;
  cursor: pointer;
  color: white;
  border-radius: 4px;
}

.cancel {
  background: #999;
}

.confirm {
  background: #2f8fd8;
}
</style>