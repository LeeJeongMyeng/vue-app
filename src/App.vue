<template>
  <div>
    <!-- <Sidebar></Sidebar>  -->
    <Header />
     <hr>
    <router-view/>
    
  </div>
</template>

<script>
import Header from './components/Header.vue';

  export default {
    created() {
      const user = sessionStorage.getItem('setUser')
     // console.log('AppVue:'+JSON.parse(user))
      if(user){
        //console.log(user, this.base64(user))
        this.$store.commit('setUser',this.base64(user))
      }
    },
    methods:{
      base64(user){
        return JSON.parse(decodeURIComponent(window.atob(user)))
      }
    },
    components:{
    Header
}
  }
</script>

<style>
@import url(assets/css/common/common.css);
 hr{
    width: 95%;
    border: 2px solid rgb(206, 206, 206,0.2);
  }
</style>