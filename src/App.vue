<script setup lang="ts">
// typScript
import { ref,onMounted  } from 'vue'
import ExpenditureForm from './components/ExpenditureForm.vue'
import IncamoForm from './components/IncamoForm.vue'
import TotalGraph from './components/TotalGraph.vue'
import { useDataStore } from './useDataStore'
import  { categotys, payments } from './types'


// 支出と収入のリスト（storeにリストの本体がある）
const store = useDataStore()

let Expenditureid = 0
let Incomeid = 0


onMounted(() => {
  store.loadFromLocalStorage()
  // IDの初期値を復元
  if (store.expenditures.length > 0) {
    Expenditureid = Math.max(...store.expenditures.map(e => e.Expenditureid)) + 1
  }
  if (store.incomes.length > 0) {
    Incomeid = Math.max(...store.incomes.map(i => i.Incomeid)) + 1
  }
  console.log('支出リスト', store.expenditures);
  console.log('収入リスト', store.incomes);
})

// フォームの切り替え
const Onswitch = ref(false) // 最初は支出

// タブの切り替え
//タブの番号
const tabs = [1, 2, 3]
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
function localreset(){
  store.resetLocalStorage()
  console.log('ローカルストレージをリセットしました。');
}
</script>

<template>
  <!-- HTML -->
  <div id="app">
  <div class="titlediv">
  <h1 id="apptitle">家計簿アプリ</h1>
  </div>
    <input @click="localreset()" class="localreset" type="button" value="ローカルストレージのリセット" />
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
      <h1 class="Titles">支出・収入の入力</h1>
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
<ExpenditureForm :categotys="categotys" :payments="payments" />
  <ExpenditureList :expenditures="store.expenditures" />
</div>
<div v-if="Onswitch" class="formsytle">
  <IncamoForm />
  <IncomeList :incomes="store.incomes" />
</div>
    </div>

    <!-- 支出・収入のリスト -->
    <div v-if="currentTab === 2">
      <h1 class="Titles">支出・収入の一覧</h1>
      <div id="listSet">
        <div class="listbox">
          <h1>支出一覧</h1>
          <br />
          <div class="list">
            <ul class="expenditureList">
              <li v-for="item in store.expenditures" :key="item.Expenditureid">
                <span>
                  {{ item.Date }} {{ item.Category }} <br />
                  {{ item.Text }} {{ item.Amount }}円 {{ item.Payment }}<br />
                  <span v-if="item.Memo">メモ: {{ item.Memo }}</span>
                </span>
                <button class="removeButton" @click="store.removeExpenditure(item)">削除</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="listbox">
          <h1>収入一覧</h1>
          <br />
          <div class="list">
            <ul class="expenditureList">
              <li v-for="item in store.incomes" :key="item.Incomeid">
                <span>
                  {{ item.Date }}<br />{{ item.Text }} &nbsp; {{ item.Amount }}円 <br />
                  <span v-if="item.Memo">メモ: &nbsp; {{ item.Memo }}</span>
                </span>
                <button class="removeButton" @click="store.removeIncome(item)">削除</button>
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
          <p class="Totaltext">収入: {{ store.incomes.reduce((acc, item) => acc + item.Amount, 0) }}円</p>
          <br />
          <p class="Totaltext">
            支出: {{ store.expenditures.reduce((acc, item) => acc + item.Amount, 0) }}円
          </p>
          <br />
          <p class="Totaltext">
            差額:
            {{
              store.incomes.reduce((acc, item) => acc + item.Amount, 0) -
              store.expenditures.reduce((acc, item) => acc + item.Amount, 0)
            }}円
          </p>
        </div>
      </div>
    </div>

    <!-- グラフ表示 -->
    <div v-if="currentTab === 3">
      <div class="Graph">
        <TotalGraph :expenditures="store.expenditures" />
      </div>
    </div>
  </div>
</template>
<style scoped src="./assets/App.css"></style>
