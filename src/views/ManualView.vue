<script setup lang="ts">
import { ref } from 'vue'
import ProbabilityGraph from '@/components/ProbabilityGraph.vue'

const attribute = ref(10)
const department = ref(3)
const focus = ref(false)
</script>

<template>
  <div>
    <h1>This is the manual values view</h1>
    <ProbabilityGraph :attribute="attribute" :department="department" :focus="focus" />
  </div>
</template>
