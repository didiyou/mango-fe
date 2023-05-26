import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import s from './StartPage.module.scss'
import { FloatButton } from "../shared/FloatButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
export const StartPage = defineComponent({
    setup: (props, context) => {
        let refOverlayVisible = ref(false)
        const onClickMenu = () => [
            refOverlayVisible.value = !refOverlayVisible.value
        ]
        return () => (
            <MainLayout>
                {
                    {
                        title: () => '开始记账',
                        icon: () => (<Icon onClick={onClickMenu} class={s.navIcon} name="menu" />),
                        default: () => (<>
                            <Center class={s.pig_wrapper}>
                                <Icon name='piggy' class={s.pig} />
                            </Center>
                            <div class={s.button_wrapper}>
                                <RouterLink to="/items/create">
                                    <Button class={s.button} >开始记账</Button>
                                </RouterLink>
                                <RouterLink to="/items/create">
                                    <FloatButton iconName='add' />
                                </RouterLink>
                            </div>
                            {refOverlayVisible.value && <Overlay onClose={() => refOverlayVisible.value = false} />}
                        </>
                        )
                    }
                }
            </MainLayout>
        )
    }
}
)






