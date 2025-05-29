<script setup lang="ts">
import { useDataStore } from '../useDataStore'
const store = useDataStore()

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
