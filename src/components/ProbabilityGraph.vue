<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h2>This is the probability graph for {{ msg }}.</h2>
  </div>
</template>
