import { createRouter, createWebHashHistory } from 'vue-router'
import ExpenditureForm from './components/form/ExpenditureForm.vue'

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
