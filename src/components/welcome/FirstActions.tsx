import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss'
import { RouterLink } from "vue-router";

export const FirstActions:FunctionalComponent = ()=>{
    return <div class={s.actions}>
    <div>跳过</div>
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <RouterLink to="/start" >跳过</RouterLink>
    </div>
  }
FirstActions.displayName = 'FirstActions'