import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

type RouteState = {
    route?: string
}
type RouteActions = {
    getCurrentRoute: ()=> void
}

export const useRouteStore = defineStore<string, RouteState, {}, RouteActions>('route', {
    state: ()=> ({
        route: '',
    }),
    actions:{
        getCurrentRoute() {
            this.route = useRoute().path
        }
    }
})

