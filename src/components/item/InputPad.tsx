import { defineComponent, ref } from 'vue';
import s from './InputPad.module.scss'
import { Icon } from '../../shared/Icon';
import { DatetimePicker, Popup } from 'vant';
import 'vant/lib/index.css';
import { time } from '../../shared/time';
export const InputPad = defineComponent({
    setup: (props, context) => {
        const buttons = [
            { text: '1', onClick: () => { appendText(1) } },
            { text: '2', onClick: () => { appendText(2) } },
            { text: '3', onClick: () => { appendText(3) } },
            { text: '4', onClick: () => { appendText(4) } },
            { text: '5', onClick: () => { appendText(5) } },
            { text: '6', onClick: () => { appendText(6) } },
            { text: '7', onClick: () => { appendText(7) } },
            { text: '8', onClick: () => { appendText(8) } },
            { text: '9', onClick: () => { appendText(9) } },
            { text: '.', onClick: () => { appendText('.') } },
            { text: '0', onClick: () => { appendText(0) } },
            { text: '清空', onClick: () => { refAmount.value = '0' } },
            { text: '提交', onClick: () => { } },
          ]
        let refAmount = ref('0')
        let dateVisible = ref(false)
        let refDate = ref(new Date())
        const showDatePicker = ()=> dateVisible.value = true
        const hideDatePicker = ()=> dateVisible.value = false
        
        
        const appendText = (n:number|string)=> {
            const nString = n.toString()
            const dotIndex = refAmount.value.indexOf('.')
            if(refAmount.value.length >13){return}
            if(dotIndex > 0 && refAmount.value.length - dotIndex >2){return}
            if(nString==='.'){
                if(dotIndex===-1){refAmount.value += nString}
            }
            else if(nString==='0'){
                if(refAmount.value !== '0'){refAmount.value += nString}
            }else{
                if(refAmount.value==='0'){
                    refAmount.value = ''
                }
                refAmount.value += nString
            }


        }
        return () => (
            <>
                <div class={s.dateAndAmount}>
                    <span class={s.calendar}>
                        <Icon name="calendar" class={s.icon} />
                        <span onClick={showDatePicker}>{time(refDate.value).format()}</span>
                        <Popup
                            v-model:show={dateVisible.value}
                            position='bottom'>
                      <DatetimePicker value={refDate.value} title="选择日期" type="date" 
                      onConfirm={(date:Date)=> {refDate.value = date; hideDatePicker}}
                      onCancel={hideDatePicker}/>
                    </Popup>
                    </span>
                    <span class={s.amount}>{refAmount.value}</span>
                </div>
                <div class={s.buttons}>
                    {buttons.map(button => <button onClick={button.onClick}>{button.text}</button>)}
                </div>
            </>
        )
    }
})