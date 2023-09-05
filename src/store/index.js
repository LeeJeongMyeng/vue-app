import {createStore} from "vuex";

export default createStore({
    state(){
        return{
            account:{
                member : {}
            }
        }
    },
    //state값을 변경하는 로직
    mutations:{
        setAccount(state,payload){
            state.account.member = payload;
        }
    }
})