import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { FormItem } from '../../shared/Form'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { Bars } from './Bars'
import { http } from '../../shared/Http'
import { Time } from '../../shared/time'
import { Tag } from '../../env'

const DAY = 24 * 3600 * 1000

type Data1Item = { happen_at: string; amount: number }
type Data1 = Data1Item[]
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const kind = ref('expenses')
    const data1 = ref<Data1>([])
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return []}
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const n = diff / DAY + 1
    return Array.from({ length: n }).map((_, i) => {
        const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getRaw()
        const item = data1.value[0]
        const amount = item && new Date(item.happen_at+'T00:00:00.000+0800').getTime() === time.getTime() ? data1.value.shift()!.amount : 0
        return [time.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), amount]
      })
    })

    const fetchData1 = async () => {
      const response = await http.get<{ groups: Data1; summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'happen_at'
      }, {_autoLoading: true})
      data1.value = response.data.groups
    }
    watch([kind, ()=> props.startDate, ()=> props.endDate], fetchData1, { immediate: true })

    const data2 = ref<Data2>([])
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount
      }))
    )

    const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100)
      }))
    })

    const fetchData2 = async ()=>{
      const response = await http.get<{ groups: Data2; summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'tag_id'
      }, {_autoLoading: true})
      data2.value = response.data.groups
    }

    watch([kind, ()=> props.startDate, ()=> props.endDate], fetchData2, { immediate: true })
    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' }
          ]}
          v-model={kind.value}
        />
        <LineChart data={betterData1.value} />
        <PieChart data={betterData2.value} />
        <Bars data={betterData3.value} />
      </div>
    )
        }
})
