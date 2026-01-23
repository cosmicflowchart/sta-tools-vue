<script setup lang="ts">
// eslint-disable-next-line import/namespace
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'

const initialGregorianDate = new Date(2371, 0, 1)
const gregorianDate = ref<Date | null>(initialGregorianDate)
const starDate = ref<number | null>(convertGregorianToStardate(initialGregorianDate))

function secondsSinceStartOfYear(date: Date): number {
  const millisecondsSinceEpoch = new Date(date.getFullYear(), 0).getTime()

  return (date.getTime() - millisecondsSinceEpoch) / 1000
}

function isleapYear(year: number): boolean {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

function secondsInYear(year: number): number {
  return (isleapYear(year) ? 366 : 365) * 24 * 60 * 60
}

function convertGregorianToStardate(date: Date): number {
  const base = (date.getFullYear() - 2323) * 1000
  return Number((base + (secondsSinceStartOfYear(date) / secondsInYear(2371)) * 1000).toFixed(1))
}

function convertStardateToGregorian(stardate: number): Date {
  const year = Math.floor(stardate / 1000) + 2323
  const secondsSinceStartOfYear = ((stardate % 1000) / 1000) * secondsInYear(year)
  return new Date(secondsSinceStartOfYear * 1000 + new Date(year, 0).getTime())
}

function updateGregorianDate() {
  gregorianDate.value = starDate.value ? convertStardateToGregorian(starDate.value) : null
}

function updateStarDate() {
  starDate.value = gregorianDate.value ? convertGregorianToStardate(gregorianDate.value) : null
}
</script>

<template>
  <div>
    <h2>Gregorian Date</h2>
    <VueDatePicker
      v-model="gregorianDate"
      dark
      :formats="{ input: 'yyyy-MM-dd HH:mm' }"
      :year-range="[2300, 2500]"
      @closed="updateStarDate"
    ></VueDatePicker>
    <h2>Stardate</h2>
    <input type="number" v-model="starDate" @change="updateGregorianDate" />
  </div>
</template>
