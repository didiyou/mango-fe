import { defineComponent, ref } from "vue";
import s from './first.module.scss'
import clock from '../../assets/icons/clock.svg'
import { RouterLink } from "vue-router";


export const Second = defineComponent({
  setup(props,context) {
    return () => (<>
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.piggy} src={clock}/>
          <h2>每日提醒<br />不遗漏每一笔</h2>
        </div>
        <div class={s.actions}>
          <a class={s.fake}>占位</a>
          <RouterLink to="/welcome/3">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    </>)
  }
})