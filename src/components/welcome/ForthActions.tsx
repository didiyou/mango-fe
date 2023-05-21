import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss'
import { RouterLink } from "vue-router";

export const ForthActions = () => (
    <div class={s.actions}>
      <div>占位</div>
      <RouterLink to="/start" >完成</RouterLink>
      <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
    </div>
  )
  
  ForthActions.displayName = 'ForthActions'