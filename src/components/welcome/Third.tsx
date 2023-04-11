import { defineComponent, ref } from "vue";
import s from './first.module.scss'
import chart from '../../assets/icons/chart.svg'
import { RouterLink } from "vue-router";


export const Third = defineComponent({
  setup(props,context) {
    return () => (<>
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.piggy} src={chart}/>
          <h2>数据可视化<br />收支一目了然</h2>
        </div>
        <div class={s.actions}>
          <a class={s.fake}>占位</a>
          <RouterLink to="/welcome/4">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    </>)
  }
})