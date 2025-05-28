<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits<{
  (e: 'add', Text: string, Amount: string, Date: string, Memo: string): void
}>()

const newIncome = ref('')
const newAmount = ref('')
const newDate = ref(new Date().toISOString().split('T')[0]) // 日付の初期値を今日の日付に設定
const newMemo = ref('')

function submit() {
  if (newIncome.value.trim() !== '') {
    emit('add', newIncome.value, newAmount.value, newDate.value, newMemo.value)
    newIncome.value = ''
    newAmount.value = ''
    newDate.value = new Date().toISOString().split('T')[0] // 日付を今日の日付にリセット
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

<style scoped></style>
