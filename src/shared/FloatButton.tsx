import { defineComponent } from 'vue';
import s from './FloatButton.module.scss'
import type { PropType } from 'vue' 
import {Icon, IconName} from './Icon'
export const FloatButton = defineComponent({
    props:{iconName:{
        type:String as PropType<IconName>,
        required:true
    }},
    setup:(props, context) =>{
        return ()=>(
            <div class={s.FloatButton}>
                <Icon name={props.iconName} class={s.icon}/>
            </div> 
        )
    }
})