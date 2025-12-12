<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

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

const chartOptions = {
  theme: {
    mode: 'dark' as const,
  },
  chart: {
    id: 'basic-bar',
  },
  xaxis: {
    categories: Array.from({ length: 10 }, (_, i) => i + 1),
  },
}
const series = computed(() =>
  cumulativeProbabilities.value.map((p, i) => ({
    name: `${i + 1} ${i > 0 ? 'dice' : 'die'}`,
    data: p.slice(1).map((v) => Math.round(v * 100)),
  })),
)
</script>

<template>
  <div>
    <p>Target Number: {{ targetNumber }}</p>
    <p>Critical Success Range: {{ criticalRange }}</p>
  </div>
  <VueApexCharts width="100%" height="350" type="line" :options="chartOptions" :series="series" />
</template>
