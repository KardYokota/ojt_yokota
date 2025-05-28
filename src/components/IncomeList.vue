<script setup lang="ts">
defineProps<{
  incomes: { Incomeid: number; Text: string; Amount: number; Date: string; Memo: string }[]
  removeIncome: (incomes: {
    Incomeid: number
    Text: string
    Amount: number
    Date: string
    Memo: string
  }) => void
}>()
</script>
<template>
  <div></div>
</template>
