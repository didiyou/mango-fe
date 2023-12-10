import { Dialog } from 'vant'
import { defineComponent, onMounted, PropType, ref, Teleport, Transition} from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
import {useMeStore} from '../../src/stores/useMeStore'
import {useRouteStore} from '../../src/stores/useRouteStore'
import { User } from '../env'

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
    show:{
      type:Boolean,
      default: false
    }
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const close = () => {
      props.onClose?.()
    }
    const route = useRoute()
    const me = ref<User>()
    onMounted(async () => {
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = () => {
      Dialog.confirm({
        title: '确认',
        message: '你真的要退出登录吗？',
      }).then(()=>{
        localStorage.removeItem('jwt')
        window.location.reload()
      })
    }
    const navNames:{to:string, IconName:"pokemon"|"charts"|"export"|"notify", name:string}[] = [
      {to: "/items", IconName: "pokemon", name: "记账"},
      {to: "/statistics", IconName: "charts", name: "统计图表"},
      {to: "/export", IconName: "export", name: "导出数据"},
      {to: "/notify", IconName: "notify", name: "记账提醒"},
    ]
    const routeStore = useRouteStore()
    routeStore.getCurrentRoute()
    return () => (
      <>
      <div v-show={props.show} class={s.mask} onClick={close}></div>
      <Transition enterFromClass={s.side_enter_from} enterActiveClass={s.side_enter_active} 
      leaveToClass={s.side_leave_to} leaveActiveClass={s.side_leave_active}>

        {/* <div v-show={props.show} class={s.wrapper}> */}
        {/* <div  class={s.mask} onClick={close}></div> */}
        <div v-show={props.show} class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
            {
              navNames.map((item)=> <li>
                <RouterLink to={item.to} class={[s.action, item.to === routeStore.route? s.selected: '']}>
                  <Icon name={item.IconName} class={s.icon} />
                  <span>{item.name}</span>
                </RouterLink>
              </li>)
            }
            </ul>
          </nav>
        </div>
        {/* </div> */}
      </Transition>
      </>
    )
  }
  
})

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        <Teleport to="body">
       <Overlay show={refOverlayVisible.value} onClose={() => refOverlayVisible.value = false} />
        </Teleport>
      </>
    )
  },
})
