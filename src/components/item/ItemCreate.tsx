import { FunctionalComponent, defineComponent, ref } from 'vue';
import s from './ItemCreate.module.scss'
import { Icon } from '../../shared/Icon';
import { MainLayout } from '../../layouts/MainLayout';
import { Tabs,Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';


export const ItemCreate = defineComponent({

    setup:(props, context) =>{
        const refKind = ref('支出')
        let count =  ref(0)
        const onUpdateSelected = (name:string)=>{
            refKind.value = name
        }
        
        return ()=>(
            <MainLayout>{             
                {
                    title:()=> '记一笔',
                    icon:()=> <Icon name='left-arrow' class={s.Icon}/>,
                    default:()=>(<>
                        <Tabs v-model:selected={refKind.value} >
                            <Tab name='支出'>
                            icon-list1
                            </Tab>
                            <Tab name='收入'>
                            icon-list2
                            </Tab>
                        </Tabs>
                        <div class={s.inputPad_wrapper}>
                            <InputPad/>
                        </div>
                        </>
                    )
                }               
            }</MainLayout>
        )
    }
})