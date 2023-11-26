import { useMeStore } from "../stores/useMeStore"



export const useAfterMe = (fn: ()=> void)=> {
    const meStore = useMeStore()
    meStore.mePromise!.then(fn, (error)=> undefined )
}