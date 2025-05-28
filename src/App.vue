<script setup lang="ts">
// typScript
import { ref } from 'vue'
import ExpenditureForm from './components/form/ExpenditureForm.vue'
import IncamoForm from './components/form/IncamoForm.vue'
import ExpenditureList from './components/ExpenditureList.vue'
import IncomeList from './components/IncomeList.vue'
import TotalGraph from './components/TotalGraph.vue'

let Expenditureid = 0
let Incomeid = 0

// 支出と収入のリスト
const expenditures = ref<
  {
    Expenditureid: number
    Text: string
    Amount: number
    Category: string
    Payment: string
    Date: string
    Memo?: string
  }[]
>([])
const incomes = ref<
  { Incomeid: number; Text: string; Amount: number; Date: string; Memo: string }[]
>([])

// 支出の追加・削除
function addExpenditure(
  Text: string,
  Amount: string,
  Category: string,
  Payment: string,
  Date: string,
  Memo?: string,
) {
  if (Text.trim() !== '' && Amount !== null && Amount !== undefined && Amount !== '') {
    expenditures.value.push({
      Expenditureid: Expenditureid++,
      Text,
      Amount: Number(Amount),
      Category,
      Payment,
      Date,
      Memo: Memo ?? '', // Memoが未入力の場合は空文字列を設定'',
    })
  }
}
function removeExpenditure(expenditure: {
  Expenditureid: number
  Text: string
  Amount: number
  Category: string
  Payment: string
  Date: string
  Memo?: string
}) {
  expenditures.value = expenditures.value.filter((t) => t !== expenditure)
}

// 収入の追加・削除
function addIncome(Text: string, Amount: string, Date: string, Memo: string) {
  if (Text.trim() !== '' && Amount !== null && Amount !== undefined && Amount !== '') {
    incomes.value.push({ Incomeid: Incomeid++, Text, Amount: Number(Amount), Date, Memo })
  }
}
function removeIncome(income: {
  Incomeid: number
  Text: string
  Amount: number
  Date: string
  Memo: string
}) {
  incomes.value = incomes.value.filter((t) => t !== income)
}

// フォームの切り替え
const Onswitch = ref(false) // 初期値は支出

// タブの切り替え
const tabs = [1, 2, 3, 4]
const currentTab = ref(tabs[0])

function switchTab(index: number) {
  currentTab.value = tabs[index]
  // 色の変更
  const buttons = document.querySelectorAll('.Tab')
  buttons.forEach((button, i) => {
    if (i === index) {
      ;(button as HTMLElement).style.backgroundColor = '#f7a335' // 選択中のタブの色
      ;(button as HTMLElement).style.color = '#ffffff' // 選択中のタブの文字色
    }
    if (i !== index) {
      ;(button as HTMLElement).style.backgroundColor = '#ffffff' // 非選択のタブの色
      ;(button as HTMLElement).style.color = '#f59657' // 非選択のタブの文字色
    }
  })
}
</script>

<template>
  <!-- HTML -->
  <div id="app">
    <div>
      <!-- 切り替えボタン -->
      <div class="tab-list">
        <input @click="switchTab(0)" class="Tab" type="button" value="支出・収入の入力" />
        <input @click="switchTab(1)" class="Tab" type="button" value="入力値の一覧" />
        <input @click="switchTab(2)" class="Tab" type="button" value="グラフ表示" />
      </div>
    </div>

    <!-- 支出・収入の入力フォーム -->
    <div v-if="currentTab === 1">
      <h1 class="Title">支出・収入の入力</h1>
      <div>
        <button class="FormButton" :class="{ active: !Onswitch }" @click="Onswitch = false">
          支出
        </button>
        <button class="FormButton" :class="{ active: Onswitch }" @click="Onswitch = true">
          収入
        </button>
      </div>
      <!-- フォームの表示,更新 -->
      <div v-if="!Onswitch" class="formsytle">
        <ExpenditureForm @add="addExpenditure" />
        <ExpenditureList :expenditures="expenditures" :removeExpenditure="removeExpenditure" />
      </div>
      <div v-if="Onswitch" class="formsytle">
        <IncamoForm @add="addIncome" />
        <IncomeList :incomes="incomes" :removeIncome="removeIncome" />
      </div>
    </div>

    <!-- 支出・収入のリスト -->
    <div v-if="currentTab === 2">
      <h1 class="Title">支出・収入の一覧</h1>
      <div id="listSet">
        <div class="listbox">
          <h1>支出一覧</h1>
          <br />
          <div class="list">
            <ul class="expenditureList">
              <li v-for="item in expenditures" :key="item.Expenditureid">
                <span>
                  {{ item.Date }} {{ item.Category }} <br />
                  {{ item.Text }} {{ item.Amount }}円 {{ item.Payment }}<br />
                  <span v-if="item.Memo">メモ: {{ item.Memo }}</span>
                </span>
                <button class="removeButton" @click="removeExpenditure(item)">削除</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="listbox">
          <h1>収入一覧</h1>
          <br />
          <div class="list">
            <ul class="expenditureList">
              <li v-for="item in incomes" :key="item.Incomeid">
                <span>
                  {{ item.Date }}<br />{{ item.Text }} &nbsp; {{ item.Amount }}円 <br />
                  <span v-if="item.Memo">メモ: &nbsp; {{ item.Memo }}</span>
                </span>
                <button class="removeButton" @click="removeIncome(item)">削除</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 合計金額の表示 -->
      <div class="TotalAmount">
        <h1 class="TotalList">合計</h1>
        <div class="Totlebox">
          <br />
          <p class="Totaltext">収入: {{ incomes.reduce((acc, item) => acc + item.Amount, 0) }}円</p>
          <br />
          <p class="Totaltext">
            支出: {{ expenditures.reduce((acc, item) => acc + item.Amount, 0) }}円
          </p>
          <br />
          <p class="Totaltext">
            差額:
            {{
              incomes.reduce((acc, item) => acc + item.Amount, 0) -
              expenditures.reduce((acc, item) => acc + item.Amount, 0)
            }}円
          </p>
        </div>
      </div>
    </div>

    <!-- グラフ表示 -->
    <div v-if="currentTab === 3">
      <div class="Graph">
        <TotalGraph :expenditures="expenditures" />
      </div>
    </div>
  </div>
</template>
<style scoped src="./assets/App.css"></style>
