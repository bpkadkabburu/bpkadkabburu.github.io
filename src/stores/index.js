import { createStore } from "vuex"

const state = {
    menu:{
        active:''
    }
}

const mutations = {
    set_menu(state, menu) {
        for (const key in menu) {
            if (menu.hasOwnProperty(key)) {
                state.menu[key] = menu[key];
            }
        }
    },
}

const actions = {

}


const store = createStore({
    state,
    mutations,
    actions,
})

export default store