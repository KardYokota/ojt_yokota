<script setup lang="ts">

import { ref } from 'vue'
import { useDataStore } from '../../useDataStore.ts'

const store = useDataStore()

//definePropsを使用して、親コンポーネントからのデータを受け取る
const emit = defineEmits<{
  (
    e: 'add',
    Text: string,
    Amount: string,
    Categolty: string,
    Payment: string,
    Date: string,
    Memo?: string,
  ): void
}>()

const newExpenditure = ref('')
const newAmount = ref('')
const newCategory = ref(' ')
const newPayment = ref('')
const newDate = ref(new Date().toISOString().split('T')[0]) // 日付の初期値を今日の日付に設
const newMemo = ref('')

// カテゴリの選択肢
const categotys = [
  ' ',
  '食費',
  '交通費',
  '光熱費',
  '通信費',
  '娯楽費',
  '教育費',
  '医療費',
  'その他',
]
const payments = [' ', '現金', 'クレジットカード', 'デビットカード', '電子マネー', 'QRコード決済']

// 支出の追加を行う関数
function submit() {
  if (newExpenditure.value.trim() !== '') {
    emit(
      'add',
      newExpenditure.value,
      newAmount.value,
      newCategory.value,
      newPayment.value,
      newDate.value,
      newMemo.value,
    )
    newExpenditure.value = ''
    newAmount.value = ''
    newCategory.value = categotys[0]
    newPayment.value = payments[0]
    newDate.value = new Date().toISOString().split('T')[0] // 日付を今日の日付にリセット
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
      <option v-for="Category in categotys" :key="Category" :value="Category">
        {{ Category }}
      </option>
    </select>
    <br />
    <h3>支払い方法</h3>
    <select v-model="newPayment">
      <option v-for="Payment in payments" :key="Payment" :value="Payment">
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

<style scoped></style>
