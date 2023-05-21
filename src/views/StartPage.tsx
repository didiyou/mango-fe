import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import s from './StartPage.module.scss'
import { FloatButton } from "../shared/FloatButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
export const StartPage = defineComponent({
    setup:(props, context) =>{
        let refOverlayVisible = ref(false)
        const onClickMenu =()=>[
            refOverlayVisible.value = !refOverlayVisible.value
        ]
        return ()=>(
            <>
            <Navbar>
                {
                    {default:()=>"小熊熊记账",icon: <Icon onclick={onClickMenu} class={s.navIcon} name="menu"/> }
                }
            </Navbar>
            <Center class={s.pig_wrapper}>
                <Icon name='piggy' class={s.pig}/>
            </Center>
            <div class={s.button_wrapper}>
                <Button class={s.button} >开始记账</Button>
                <FloatButton iconName='add'/>
            </div>
            {refOverlayVisible.value && <Overlay onClose={() => refOverlayVisible.value = false}/>}
            </>
        )
    }
})