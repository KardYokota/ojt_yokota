<script setup lang="ts">

import { useDataStore } from '../useDataStore.ts'


const store = useDataStore()

// 支出のデータ
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


//　収入のデータ
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




