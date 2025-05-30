import { createRouter, createWebHashHistory } from 'vue-router'
import ExpenditureForm from './components/ExpenditureForm.vue'

const routes = [
  {
    path: '/expenditureform',
    name: 'expenditureform',
    component: ExpenditureForm,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
