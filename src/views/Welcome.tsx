import { Transition, VNode, defineComponent, ref, watchEffect} from "vue";
import { RouteLocationNormalizedLoaded,RouterView, useRoute, useRouter} from "vue-router";
import s from './welcome.module.scss'
import { useSwipe } from '../hooks/useSwipe'
import { throttle } from "../shared/throttle";
const pushMap:Record<string, string> = {
  'Welcome1':'/Welcome/2',
  'Welcome2':'/Welcome/3',
  'Welcome3':'/Welcome/4',
  'Welcome4':'/start'
}
export const Welcome = defineComponent({
  setup(props,context) {
    const main = ref<HTMLElement>()
    const {direction, swiping} = useSwipe(main, {beforeStart:e=>e.preventDefault()})
    const route = useRoute()
    console.log(route.name)
    const router = useRouter()
    const push = throttle(()=>{
      const name = (route.name || 'Welcome1').toString()
        router.push(pushMap[name])
    }, 500)
    watchEffect(()=>{
      if(swiping.value && direction.value === 'left')
      {push()}
    })
    return () => (<div class={s.wrapper}>
    <header class={s.header}>
      <svg> <use xlinkHref='#mangosteen'/></svg>
      <p>山竹记账</p>
    </header>
      <main class={s.main} ref={main}><RouterView name='main'>
        {
          ({Component:x,route:y}:{Component:VNode,route:RouteLocationNormalizedLoaded})=>
          <Transition
            enterFromClass={s.slide_fade_enter_from}
            enterActiveClass={s.slide_fade_enter_active}
            leaveToClass={s.slide_fade_leave_to}
            leaveActiveClass={s.slide_fade_leave_active}>
              {x}
          </Transition>
        }
      </RouterView>
      
      </main>
      <footer class={s.footer}><RouterView name='footer'/></footer>
    </div>)
  }
})