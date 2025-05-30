<script setup lang="ts">
import { ref } from 'vue'
import { useDataStore } from '../useDataStore.ts'

const store = useDataStore()


const newIncome = ref('')
const newAmount = ref('')
const newDate = ref(new Date().toISOString().split('T')[0])
const newMemo = ref('')

let Incomeid = ref(
  store.incomes.length > 0
    ? Math.max(...store.incomes.map(i => i.Incomeid)) + 1
    : 0
)
function submit() {
  if (newIncome.value.trim() !== '' && newAmount.value !== '') {
    store.addIncome({
      Incomeid: Incomeid.value++,
      Text: newIncome.value,
      Amount: Number(newAmount.value),
      Date: newDate.value,
      Memo: newMemo.value,
    })
    // 入力欄リセット
    newIncome.value = ''
    newAmount.value = ''
    newDate.value = new Date().toISOString().split('T')[0]
    newMemo.value = ''
  }
}
</script>

<template>
  <div class="Incomeform">
    <h2>収入入力</h2>
    <br />
    <h3>収入</h3>
    <input v-model="newIncome" placeholder="収入を追加" />
    <br />
    <h3>金額</h3>
    <input type="number" v-model="newAmount" placeholder="金額を追加" />
    <br />
    <h3>日付</h3>
    <input type="Date" v-model="newDate" />
    <br />
    <h3>メモ</h3>
    <input v-model="newMemo" />
    <br />
    <button class="button" @click="submit">追加</button>
    <div style="margin-top: 1rem"></div>
  </div>
  <RouterView />
</template>

