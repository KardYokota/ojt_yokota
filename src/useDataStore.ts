import { defineStore } from 'pinia'

// Piniaストアの定義
// このストアは支出と収入のデータを管理します
// それぞれのデータはローカルストレージに保存され、アプリケーションの再起動後も保持されます

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    // 支出と収入のデータを格納する配列
    // 各支出と収入はオブジェクトとして管理されます
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
  // gettersはここでは使用しませんが、必要に応じて追加できます
 actions: {
   addExpenditure(item: any) {
      this.expenditures.push(item)
      this.saveToLocalStorage() // 支出を追加し、ローカルストレージに保存
    },
    // 支出を削除するメソッド
    removeExpenditure(item: any) {
      this.expenditures = this.expenditures.filter((t) => t !== item)
      this.saveToLocalStorage() // 支出を削除し、ローカルストレージに保存
    },
    // 収入を追加するメソッド
    addIncome(item: any) {
      this.incomes.push(item)
      this.saveToLocalStorage() // 収入を追加し、ローカルストレージに保存
    },
    // 収入を削除するメソッド
    removeIncome(item: any) {
      this.incomes = this.incomes.filter((t) => t !== item)
      this.saveToLocalStorage() // 収入を削除し、ローカルストレージに保存
    },
    // ローカルストレージにデータを保存するメソッド
    saveToLocalStorage() {
      localStorage.setItem('expenditures', JSON.stringify(this.expenditures))
      localStorage.setItem('incomes', JSON.stringify(this.incomes))
    },
    // ローカルストレージからデータを読み込むメソッド
    loadFromLocalStorage() {
      const exp = localStorage.getItem('expenditures')
      const inc = localStorage.getItem('incomes')
      if (exp) this.expenditures = JSON.parse(exp)
      if (inc) this.incomes = JSON.parse(inc)
    },
  resetLocalStorage() {
      localStorage.removeItem('expenditures')
      localStorage.removeItem('incomes')
      this.expenditures = []
      this.incomes = []
    }
  },
// Piniaの永続化プラグインを使用して、ストアの状態をローカルストレージに保存します
  })