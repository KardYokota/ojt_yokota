<script setup lang="ts">

import { ref } from 'vue'
import { useDataStore } from '../useDataStore.ts'
import type { categotys , payments } from '../types.ts'
const store = useDataStore()

//definePropsを使用して、親コンポーネントからのデータを受け取る
const props = defineProps<{ 
  categotys: string[]
  payments: string[]
}>()

const newExpenditure = ref('')
const newAmount = ref('')
const newCategory = ref(' ')
const newPayment = ref('')
const newDate = ref(new Date().toISOString().split('T')[0]) // 日付の初期値を今日の日付に設
const newMemo = ref('')


 let Expenditureid = ref(
  store.expenditures.length > 0
    ? Math.max(...store.expenditures.map(e => e.Expenditureid)) + 1
    : 0
)

function submit() {
  if (newExpenditure.value.trim() !== '' && newAmount.value !== '') {
    store.addExpenditure({
      Expenditureid: Expenditureid.value++,
      Text: newExpenditure.value,
      Amount: Number(newAmount.value),
      Category: newCategory.value,
      Payment: newPayment.value,
      Date: newDate.value,
      Memo: newMemo.value ?? '',
    })
    // 入力欄リセット
    newExpenditure.value = ''
    newAmount.value = ''
    newCategory.value = ' '
    newPayment.value = ''
    newDate.value = new Date().toISOString().split('T')[0]
    newMemo.value = ''
  }
}

</script>

<template>
  <div class="expenditureform">
    <h2>支出入力</h2>
    <br />
    <h3>支出</h3>
    <input v-model="newExpenditure" placeholder="支出を追加" />
    <br />
    <h3>金額</h3>
    <input type="number" v-model="newAmount" placeholder="金額を追加" />
    <br />
    <h3>カテゴリ</h3>
    <select v-model="newCategory">
      <option v-for="Category in props.categotys" :key="Category" :value="Category">
        {{ Category }}
      </option>
    </select>
    <br />
    <h3>支払い方法</h3>
    <select v-model="newPayment">
      <option v-for="Payment in props.payments" :key="Payment" :value="Payment">
        {{ Payment }}
      </option>
    </select>
    <br />
    <h3>日付</h3>
    <input type="date" v-model="newDate" />
    <br />
    <h3>メモ</h3>
    <input v-model="newMemo" />
    <br />
    <button class="button" @click="submit">追加</button>
    <div style="margin-top: 1rem"></div>
  </div>
  <RouterView />
</template>

