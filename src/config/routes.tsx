import { RouteRecordRaw } from "vue-router";
import { ItemCreate } from "../components/item/ItemCreate";
import { ItemList } from "../components/item/ItemList";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";
import { Forth } from "../components/welcome/Forth";
import { ForthActions } from "../components/welcome/ForthActions";
import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";
import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { StatisticsPage } from "../views/StatisticsPage";
import {ComingSoon} from '../shared/ComingSoon'
import SignInPage from "../views/SignInPage";



export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: ()=> import('../views/Welcome'),
    // beforeEnter: (to, from, next) => {
    //   localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()
    // },
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: "Welcome1", components: { main: First, footer: FirstActions }, },
      { path: '2', name: "Welcome2", components: { main: Second, footer: SecondActions }, },
      { path: '3', name: "Welcome3", components: { main: Third, footer: ThirdActions }, },
      { path: '4', name: "Welcome4", components: { main: Forth, footer: ForthActions }, },
    ]
  },
  // { path: '/start', component: StartPage },
  {
    path: '/items', component: ()=> import('../views/ItemPage'),
    children: [   
      { path: '', component: ()=> import('../../src/components/item/ItemList') },
      { path: 'create', component: ()=> import('../../src/components/item/ItemCreate') },
    ]
  },
  {
    path: '/tags', component: ()=> import('../views/TagPage'),
    children: [
      { path: 'create', component: ()=> import('../components/tag/TagCreate') },
      { path: ':id/edit', component: ()=> import('../components/tag/TagEdit') }
    ]
  },
  {
    path: '/sign_in', component: SignInPage
  },
{
    path: '/statistics', component: StatisticsPage
},
  {path: '/export', component: ()=> import('../../src/shared/ComingSoon')},
  {path: '/notify', component: ()=> import('../../src/shared/ComingSoon')}
]
