<template>
  <div>
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  export default {
    created() {
      const user = sessionStorage.getItem('setUser')
     // console.log('AppVue:'+JSON.parse(user))
      if(user){
        //console.log(user, this.base64(user))
        this.$store.commit('setUser',this.base64(user))
      }
    },

    setup(){
      //새로고침해도 풀리지않도록 작업
      const id = sessionStorage.getItem("id");
      if(id){
        store.commit("setAccount",id);
      }
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
