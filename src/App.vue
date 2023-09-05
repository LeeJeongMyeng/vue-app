<template>
  <div>
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
  import Header from './components/Header.vue'
  import { watch } from "vue";
import { useRoute } from 'vue-router'
import store from '@/store';

  export default {
    created() {
      const user = sessionStorage.getItem('setUser')
     // console.log('AppVue:'+JSON.parse(user))
      if(user){
        //console.log(user, this.base64(user))
        this.$store.commit('setUser',this.base64(user))
      }

      const route = useRoute();
    },
    
    setup() {
    const token_check = () => {
      axios.get("/ctg/account_check").then(({ data }) => {
        console.log(data);
        store.commit("setAccount", data || null);
      })
    };

    const route = useRoute();
    

     watch(route, () => {
      token_check();
    })
  },
    methods:{
      base64(user){
        return JSON.parse(decodeURIComponent(window.atob(user)))
      }
    },
    components:{
      'Header' : Header
    }
  }
</script>

<style>
@import url(./assets/css/common/common.css);

</style>
