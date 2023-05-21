import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss'
import { RouterLink } from "vue-router";

export const ThirdActions: FunctionalComponent = () => {
    return <div class={s.actions}>
      <div>占位</div>
      <RouterLink to="/welcome/4" >下一页</RouterLink>
      <RouterLink to="/start" >跳过</RouterLink>
    </div>
  }
  
  ThirdActions.displayName = 'ThirdActions'
  