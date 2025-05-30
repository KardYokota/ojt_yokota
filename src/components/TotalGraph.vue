<script setup lang="ts">
import { computed, ref } from 'vue'
import { Chart, Responsive, Pie, Tooltip } from 'vue3-charts'
import type { ChartAxis } from 'vue3-charts/dist/types'
import { useDataStore } from '../useDataStore'
import type { Ref } from 'vue'

const store = useDataStore()

//データの受け取り
const props = defineProps<{
  expenditures: {
    Expenditureid: number
    Text: string
    Amount: number
    Category: string
    Payment: string
    Date: string
    Memo?: string
  }[]
}>()

// カテゴリーごとに合計金額を集計
const categoryData = computed(() => {
  const map = new Map<string, number>()
  for (const item of props.expenditures) {
    if (!item.Category) continue
    map.set(item.Category, (map.get(item.Category) || 0) + item.Amount)
  }
  // グラフ用データ形式に変換
  return Array.from(map, ([Category, Amount]) => ({ Category, Amount }))
})

// グラフの軸設定(円グラフの場合は通常は非表示)
const axis: Ref<ChartAxis> = ref({
  primary: { hide: true, domain: ['dataMin', 'dataMax'], type: 'band' },
  secondary: { hide: true, domain: ['dataMin', 'dataMax'], type: 'band' },
})
</script>

<template>
  <h1 class="Titles">支出グラフ</h1>
  <Responsive class="w-full">
    <template #main="{ width }">
      <div>
        <h3>支出の合計金額をカテゴリーごとに表示します</h3>
        <p class="text-gray-500">※グラフの上にマウスを乗せると、カテゴリーと金額が表示されます。</p>
      </div>
      <br />

      <div class="graph-flex">
        <!-- ← ここを順番入れ替え -->
        <div class="side-info">
          <h3>カテゴリー別合計</h3>
          <ul>
            <li v-for="item in categoryData" :key="item.Category">
              <span class="cat">{{ item.Category }}</span
              >：
              <span class="amt">{{ item.Amount }}円</span>
            </li>
          </ul>
          <div
            v-if="categoryData.length === 0"
            class="text-center text-gray-500"
            style="font-size: 1.2em"
          >
            <label>データがありません。</label>
          </div>
        </div>
        <!-- グラフ本体 -->
        <Chart
          class="chart"
          direction="circular"
          :size="{ width: width - 200, height: 300 }"
          :data="categoryData"
          :margin="{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }"
          :axis="axis"
          :config="{ controlHover: false }"
        >
          <template #layers>
            <Pie
              :dataKeys="['Category', 'Amount']"
              :pie-style="{ innerRadius: 0, padAngle: 0.0 }"
            />
          </template>
          <template #widgets>
            <Tooltip
              :config="{
                Category: { label: 'カテゴリー' },
                Amount: { label: '' },
              }"
              hideLine
            />
          </template>
        </Chart>
      </div>
    </template>
  </Responsive>
</template>

<style scoped>
.w-full {
  background: #ffffff;
  border: 2px solid #1976d2;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin: 1rem auto;
  max-width: 700px;
  height: 450px;
  min-width: 500px;
  position: relative;
}
.Tooltipposition {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
}
.graph-flex {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}
.side-info {
  min-width: 200px;
  max-width: 250px;
  background: #f7f7fa;
  border-radius: 8px;
  padding: 12px 10px;
  border: 1px solid #f7a335;
  font-size: 1em;
  margin-right: 5rem;
  margin-left: 1rem;
}
.side-info h3 {
  margin: 0 0 8px 0;
  font-size: 1.1em;
  color: #f7a335;
}
.cat {
  color: #19d2aa;
  font-weight: bold;
}
.amt {
  color: #f7a335;
  font-weight: bold;
}
</style>
