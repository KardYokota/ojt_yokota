<script setup lang="ts">
//データ
defineProps<{
  expenditures: {
    Expenditureid: number
    Text: string
    Amount: number
    Category: string
    Payment: string
    Date: string
    Memo?: string
  }[]
  // 収入の削除
  removeExpenditure: (expenditure: {
    Expenditureid: number
    Text: string
    Amount: number
    Category: string
    Payment: string
    Date: string
    Memo?: string
  }) => void
}>()
</script>

<template>
  <div></div>
</template>
