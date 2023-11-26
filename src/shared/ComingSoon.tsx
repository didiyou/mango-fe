import { defineComponent, PropType } from 'vue'
import { Center } from './Center'
import s from './ComingSoon.module.scss'
import { MainLayout } from '../layouts/MainLayout'
import { BackIcon } from './BackIcon'
import { Icon } from './Icon'

export const ComingSoon = defineComponent({
    setup: (props, context) =>{
        return ()=> (
            <MainLayout>
               {
                {
                    title: () => "返回",
                    icon: ()=> <BackIcon />,
                    default: ()=>           
                    <Center class={s.wrapper}>
                    <Icon name="CommingSoon" class={s.ComingSoon} />
                    </Center>
                }
               } 
            </MainLayout>
        )
    }
})