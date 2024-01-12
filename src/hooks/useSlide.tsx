import { ref, Ref, computed, onUnmounted, watch } from 'vue'

type Point = {
  x: number
  y: number
}
export const useSlide = (element: Ref<HTMLElement | undefined>) => {
  const start = ref<Point>()
  const end = ref<Point>()
  const swiping = ref(false)
  const LiIndex = ref<number>()
  const currentTag = ref<HTMLOListElement>()
  const startPointed = ref<any>()
  const endPointed = ref<any>()
  const distance = computed(() => {
    if (!start.value || !end.value) {
      return null
    }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y
    }
  })


  const direction = computed(() => {
    if (!distance.value || !currentTag.value || pressTime < 1) {
      return ''
    }
    const { x, y } = distance.value
    const LiList = Array.from(currentTag.value!.children)
    for (let index = 0; index < LiList.length; index++) {
        const li = LiList[index]
        if (li.contains(startPointed.value) && li.contains(endPointed.value)) {
          if (Math.abs(x) > Math.abs(y) && Math.abs(x) > 20) {
            if(x<0){LiIndex.value = index; return 'left'}
            else if(x>0 && index === LiIndex.value){return 'right'}
          } else {
            return ''
          }
        }
      }
  })
  let pressTime = 0
  let pressTimer = 0
  const onStart = (e: TouchEvent) => {
    e.preventDefault()
    pressTime = 0
    currentTag.value = e.currentTarget as HTMLOListElement
    pressTimer = setInterval(() => {
        pressTime = pressTime + 1
      },300)
    startPointed.value = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
  }
  const onMove = (e: TouchEvent) => {
    if (!start.value) {
      return
    }
    swiping.value = true
    end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    endPointed.value = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
  }
  const onEnd = (e: TouchEvent) => {
    e.preventDefault()
    clearInterval(pressTimer)
    const target = e.target as HTMLElement
    if(pressTime<1 && target.parentNode?.nodeName.toLowerCase() === 'li'){target.click()}
    swiping.value = false
  } 

  watch(element, () => {
    element.value?.addEventListener('touchstart', onStart)
    element.value?.addEventListener('touchmove', onMove)
    element.value?.addEventListener('touchend', onEnd)
  })

  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return {
    LiIndex, direction
  }
}
