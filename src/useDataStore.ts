import { defineStore } from 'pinia'

// Piniaストアの定義
// このストアは支出と収入のデータを管理します
// それぞれのデータはローカルストレージに保存され、アプリケーションの再起動後も保持されます

export const useDataStore = defineStore('data', {
  state: () => ({
    expenditures: [] as {
      Expenditureid: number
      Text: string
      Amount: number
      Category: string
      Payment: string
      Date: string
      Memo?: string
    }[],
    incomes: [] as {
      Incomeid: number
      Text: string
      Amount: number
      Date: string
      Memo: string
    }[],
  }),
  persist: true, // これでローカルストレージに自動保存されます
})