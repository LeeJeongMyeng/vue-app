import { isEmptyObject } from "jquery";
import {createStore} from "vuex";

export default createStore({
    state(){
        return{
            account:{
               member:{
                name : '',
                email: '',
                userno: ''
                //bnCheck: '' 
               }
            }
        }
    },
    //state값을 변경하는 로직
    mutations:{
        setAccount(state,payload){
            console.log(payload);
        }
    }
})