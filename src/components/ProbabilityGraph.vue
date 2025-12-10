<script setup lang="ts">
import { computed } from 'vue'

import { getCumulativeProbability, getSuccessProbabilityNDice } from '@/lib/probability'

const props = defineProps<{
  attribute: number
  department: number
  focus: boolean
}>()
const targetNumber = computed(() => props.attribute + props.department)
const criticalRange = computed(() => (props.focus ? props.department : 1))
const cumulativeProbabilities = computed(() => {
  const probabilities = getSuccessProbabilityNDice(targetNumber.value, criticalRange.value, 5)

  return probabilities.map(getCumulativeProbability)
})
</script>

<template>
  <div>
    <p>Target Number: {{ targetNumber }}</p>
    <p>Critical Success Range: {{ criticalRange }}</p>
  </div>
</template>
