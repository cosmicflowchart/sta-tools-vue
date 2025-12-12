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

const tableRows = computed(() => {
  const rows = []

  for (let i = 1; i <= 10; i++) {
    const newRow = []
    for (const probs of cumulativeProbabilities.value) {
      if (probs.length <= i) {
        newRow.push(null)
        continue
      }
      const value = (probs[i] as number) * 100
      newRow.push(`${value.toPrecision(3)}%`)
    }
    rows.push(newRow)
  }

  return rows
})
</script>

<template>
  <div>
    <p>Target Number: {{ targetNumber }}</p>
    <p>Critical Success Range: {{ criticalRange }}</p>
  </div>
  <table>
    <tr>
      <th />
      <th v-for="i in 5" :key="i">{{ i }} {{ i > 1 ? 'Dice' : 'Die' }}</th>
    </tr>
    <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
      <td>{{ rowIndex + 1 }}+</td>
      <td v-for="(probability, colIndex) in row" :key="colIndex">
        {{ probability }}
      </td>
    </tr>
  </table>
</template>

<style scoped>
td {
  padding: 1rem;
}
</style>
