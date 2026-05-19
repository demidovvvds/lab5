<script setup>
import Clicker from './components/Clicker.vue'

function showAlert(number) {
  alert(`Clicker ${number} clicked!`)
}
</script>

<template>
  <main>
    <h1>100 независимых кликеров</h1>

    <div class="clickers">
      <Clicker
        v-for="number in 100"
        :key="number"
        :amount="1"
        @button-clicked="showAlert(number)"
      >
        Clicker {{ number }}
      </Clicker>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: Arial, sans-serif;
  padding: 30px;
}

.clickers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>