import { defineComponent } from 'vue';
import s from './Icon.module.scss'
import type { PropType } from 'vue' 
export type IconName = 'add'|'chart'|'clock'|'cloud'|'mangosteen'|'piggy'|'menu'|'notify'|'charts'|'export'|'left-arrow'|'calendar'
export const Icon = defineComponent({
    props:{name:{
        type:String as PropType<IconName>,
        required:true
    },
    onClick:{
        type:Function as PropType<(e:MouseEvent) => void>
    }
},
    setup:(props, context) =>{
        return ()=>(
            <svg class={s.icon} onClick={props.onClick}>
                <use xlinkHref={'#' + props.name}></use>
            </svg>
        )
    }
})