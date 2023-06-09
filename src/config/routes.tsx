import { RouteRecordRaw } from "vue-router";
import { Third } from "../components/welcome/Third";
import { Second } from "../components/welcome/Second";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Welcome } from "../views/Welcome";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ForthActions } from "../components/welcome/ForthActions";
import { StartPage } from "../views/StartPage";
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";


export const routes:RouteRecordRaw[] = [
    {path:'/',redirect:'/welcome'},
    {path:'/welcome',component:Welcome,children:[
        {path:'', redirect:'/welcome/1'},
        {path:'1', name:'Welcome1', components:{main:First,footer:FirstActions}},
        {path:'2', name:'Welcome2', components:{main:Second,footer:SecondActions}},
        {path:'3', name:'Welcome3', components:{main:Third,footer:ThirdActions}},
        {path:'4', name:'Welcome4', components:{main:Forth,footer:ForthActions}},
        
]},
{path:'/start', name:'Start', component:StartPage},
{path:'/items', component:ItemPage, children:[{path:'', component:ItemList},{path:'create', component:ItemCreate}]}
]