import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import '@svgstore';
import { createPinia } from 'pinia'
import {useMeStore} from '../src/stores/useMeStore'

const router = createRouter({ history, routes })

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/items': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

const meStore = useMeStore()
meStore.fetchMe()

router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return meStore.mePromise!.then(
    () => true,
    () => '/sign_in?return_to=' + from.path
  ) 
})