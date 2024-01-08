import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { Button } from '../../shared/Button'
import { Datetime } from '../../shared/Datetime'
import { FloatButton } from '../../shared/FloatButton'
import { http } from '../../shared/Http'
import { Money } from '../../shared/Money'
import s from './ItemSummary.module.scss'
import { RouterLink } from 'vue-router'
import { Center } from '../../shared/Center'
import { Icon } from '../../shared/Icon'
import {useAfterMe} from '../../hooks/useAfterMe'
import {useItemStore} from '../../../src/stores/useItemStore'
import { useSlide } from '../../hooks/useSlide'
import { Dialog } from 'vant'

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,  
    },
  },
  setup: (props, context) => {
    const itemStore = useItemStore(`items-${props.startDate}-${props.endDate}`)
    useAfterMe(()=> itemStore.fetchItems(props.startDate, props.endDate))

    const onError = () => {
      Dialog.alert({ title: '提示', message: '删除失败' })
    }

    const refItem = ref<HTMLElement>()
    const {direction, LiIndex} = useSlide(refItem)
    const remove = async(Itemid:number)=>{
      console.log('点击删除')
      await http
      .delete(`/items/${Itemid}`, {}, {_autoLoading: true})
      .catch(onError)
      fetchItemsBalance()
      itemStore.$reset()
      itemStore.fetchItems(props.startDate, props.endDate)
    }
    
    const revokeRM = ref(false)

    const revoke = function(index:number) {
      console.log('点击左边')
      if(index === LiIndex.value && leftSlide.value===true){revokeRM.value = true}
      else {revokeRM.value = false}
     }

     const leftSlide = computed<boolean>(()=>{
      if(!revokeRM.value && direction.value==='left'){revokeRM.value = false; return true}
      else{return false}
    })
    watch(()=>[props.startDate,props.endDate], ()=>{
      itemStore.$reset()
      itemStore.fetchItems(props.startDate, props.endDate)
    })

    const itemsBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    const fetchItemsBalance =async ()=>{
      if(!props.startDate || !props.endDate){ return }
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate})
      Object.assign(itemsBalance, response.data)
    }
    useAfterMe(fetchItemsBalance)
    watch(()=>[props.startDate,props.endDate], ()=>{
      Object.assign(itemsBalance, {
        expenses: 0, income: 0, balance: 0
      })
      fetchItemsBalance()
    })

    return () => (
      (!props.startDate || !props.endDate) ? 
      <div>请先选择时间范围</div> : 
      <div class={s.wrapper}>
        {(itemStore.items && itemStore.items.length > 0) ? (
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <Money value={itemsBalance.income} />
              </li>
              <li>
                <span>支出</span>
                <Money value={itemsBalance.expenses} />
              </li>
              <li>
                <span>净收入</span>
                <Money value={itemsBalance.balance} />
              </li>
            </ul>
            <ol class={s.list} ref={refItem}>
              {itemStore.items.map((item, index) => (
                <li data-index={(leftSlide.value && index===LiIndex.value) ? 'true':'false'}>
                  <div class={s.click} onClick={()=>revoke(index)}>
                  <div class={s.sign}>
                    <span>{item.tags!.length > 0 ? item.tags![0].sign: '〰️'}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags!.length > 0 ? item.tags![0].name: '无标签'}</span>
                      <span class={s.amount}>￥<Money value={item.amount}/></span>
                    </div>
                    <div class={s.time}><Datetime value={item.happen_at}/></div>
                  </div>
                  </div>
                  <div class={s.remove} onClick={()=> remove(item.id)}>删除</div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {itemStore.hasMore ?
                <Button onClick={()=> itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button> :
                <span>没有更多</span>
              }
            </div>
            <RouterLink to="/items/create">
              <FloatButton iconName='add' />
            </RouterLink>
          </>
        ) : (
          <>
            <Center class={s.pig_wrapper}>
              <Icon name="pokemon" class={s.pig} />
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
              </RouterLink>
            </div>
          </>
        )}
      </div>
    )
  },
})
