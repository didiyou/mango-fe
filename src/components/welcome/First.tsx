import { defineComponent, ref } from "vue";
import s from './first.module.scss'
import piggy from '../../assets/icons/piggy.svg'
import { RouterLink } from "vue-router";


export const First = defineComponent({
  setup(props,context) {
    return () => (<>
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.piggy} src={piggy}/>
          <h2>会挣钱<br />还要会省钱</h2>
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