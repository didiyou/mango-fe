import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import s from './welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'

export const Welcome = defineComponent({
  setup(props,context) {
    return () => (<div class={s.wrapper}>
    <header class={s.header}>
      <img class={s.logo} src={logo}/>
      <p>山竹记账</p>
    </header>
      <main class={s.main}><RouterView/></main>
    <footer class={s.footer}></footer> 
    </div>)
  }
})