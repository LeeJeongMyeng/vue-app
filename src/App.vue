<template>
  <div>
    <Header :data="data" />
    <router-view/>
    <Footer :data="data"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './components/Header.vue';
  import Footer from "./components/Footer.vue";
  import { watch } from "vue";
  import { useRoute } from 'vue-router';
import store from '@/store'

  export default {
    data(){
      return{
        data : true
      }
    },
   
    
    setup() {
    const token_check = () => {
      axios.get("/ctg/account_check").then(({ data }) => {
        console.log(data);
        //store.commit("setAccount", data || null);
      })
    };

    const route = useRoute();
    

     watch(route, () => {
      token_check();
    })
  },
    methods:{
      Check_Log_Btn(){
        if (localStorage.getItem("member")) {
        this.bool = false;
      } else {
        this.bool = true
      }
      }
    },
    components:{
      'Header' : Header,
      'Footer' : Footer
    }
  }
</script>

<style>
@import url(./assets/css/common/common.css);

</style>
