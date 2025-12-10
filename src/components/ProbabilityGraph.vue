<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  attribute: number
  department: number
  focus: boolean
}>()
const targetNumber = computed(() => props.attribute + props.department)
const criticalRange = computed(() => (props.focus ? props.department : 1))
</script>

<template>
  <div>
    <p>Target Number: {{ targetNumber }}</p>
    <p>Critical Success Range: {{ criticalRange }}</p>
  </div>
</template>
