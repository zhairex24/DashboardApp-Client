import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import OrdersView from '@/views/reporting/screens/OrdersView.vue'
import ProductsView from '@/views/reporting/screens/ProductsView.vue'
import SuppliersView from '@/views/reporting/screens/SuppliersView.vue'
import CustomersView from '@/views/relations/screens/CustomersView.vue'
import OrderDetails from '@/views/reporting/details/OrderDetails.vue'
import ProductDetails from '@/views/reporting/details/ProductDetails.vue'
import AdminView from '@/views/administration/AdminView.vue'
import UserSettings from '@/views/user/screens/UserSettings.vue'
// permission
import { get, get as getFromStore } from '@/local-storage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,

    children: [
      {
        path: '/orders',
        name: 'orders',
        component: OrdersView,
        meta: { screen: "orders" }
      },
      {
        path: '/orders/:id',
        name: 'order-details',
        component: OrderDetails,
        meta: { screen: "order-details" }
      },
      {
        path: '/products',
        name: 'products',
        component: ProductsView,
        meta: { screen: "products" }
      },
      {
        path: '/products/:id',
        name: 'product-details',
        component: ProductDetails,
        meta: { screen: "product-details" }
      },
      {
        path: '/suppliers',
        name: 'suppliers',
        component: SuppliersView,
        meta: { screen: "suppliers" }
      },
      {
        path: '/customers',
        name: 'customers',
        component: CustomersView,
        meta: { screen: "customers" }
      },
      {
        path: '/administration',
        name: 'administration',
        component: AdminView,
        meta: { screen: "administration" },
        beforeEnter: (to: any, from: any, next: any) => {
          const isAdmin = getFromStore('logged.is_admin')
          if(isAdmin) {
            next()
          }
        }
      },
      {
        path: '/user-settings',
        name: 'user-settings',
        component: UserSettings,
        meta: { screen: "user-settings" }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async(to, from) => {
  const isLogged = Boolean(getFromStore('logged'))
  const requiresReset = getFromStore('logged.requires_reset')

  if(!isLogged && to.name !== 'dashboard') {
    return {name: 'dashboard'}
  } else if(requiresReset && to.name !== 'user-settings') {
    return {name: 'user-settings'}
  }
})

export default router
