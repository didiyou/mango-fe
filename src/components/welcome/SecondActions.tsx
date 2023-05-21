import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss'
import { RouterLink } from "vue-router";

export const SecondActions: FunctionalComponent = () => {
    return <div class={s.actions}>
      <div>占位</div>
      <RouterLink to="/welcome/3" >下一页</RouterLink>
      <RouterLink to="/start" >跳过</RouterLink>
    </div>
  }
  
  SecondActions.displayName = 'SecondActions'