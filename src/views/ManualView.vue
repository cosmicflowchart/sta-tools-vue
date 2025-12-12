<script setup lang="ts">
import { ref } from 'vue'

import ProbabilityGraph from '@/components/ProbabilityGraph.vue'

const attribute = ref(10)
const department = ref(3)
const focus = ref(false)
</script>

<template>
  <div class="manual-view">
    <div class="inputs">
      <div>
        <label for="attribute">Attribute</label>
        <input type="number" min="7" max="15" v-model="attribute" />
      </div>
      <div>
        <label for="department">Department</label>
        <input type="number" min="1" max="5" v-model="department" />
      </div>
      <div>
        <label for="focus">Apply Focus</label>
        <input type="checkbox" v-model="focus" />
      </div>
    </div>
    <hr />
    <ProbabilityGraph :attribute="attribute" :department="department" :focus="focus" />
  </div>
</template>

<style scoped>
.manual-view {
  width: 100%;
}

hr {
  margin: 1rem 0;
}

.inputs > div {
  display: flex;
  align-items: end;
  column-gap: 1rem;
}

.inputs input {
  margin-left: auto;
  width: 3rem;
}
</style>
