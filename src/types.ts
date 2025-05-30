import type { ChartAxis } from 'vue3-charts/dist/types'
import type { Ref } from 'vue'
import { ref } from 'vue'
// 支出データ型
export interface Expenditure {
  Expenditureid: number
  Text: string
  Amount: number
  Category: string
  Payment: string
  Date: string
  Memo?: string
}

// グラフの軸設定(円グラフの場合は通常は非表示)
export const Axis: Ref<ChartAxis> = ref({
  primary: { hide: true, domain: ['dataMin', 'dataMax'], type: 'band' },
  secondary: { hide: true, domain: ['dataMin', 'dataMax'], type: 'band' },
})
//入力フォーム用
// カテゴリの選択肢
 export const categotys = [
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
// 決済方法の選択肢
 export const payments = [' ', '現金', 'クレジットカード', 'デビットカード', '電子マネー', 'QRコード決済']

// グラフ軸型
export type { ChartAxis }