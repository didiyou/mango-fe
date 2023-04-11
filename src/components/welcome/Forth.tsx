import { defineComponent, ref } from "vue";
import s from './first.module.scss'
import cloud from '../../assets/icons/cloud.svg'
import { RouterLink } from "vue-router";


export const Forth = defineComponent({
  setup(props,context) {
    return () => (<>
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.piggy} src={cloud}/>
          <h2>云备份<br />再也不怕数据丢失</h2>
        </div>
        <div class={s.actions}>
          <a class={s.fake}>占位</a>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    </>)
  }
})