import type { ChartAxis } from 'vue3-charts/dist/types'

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