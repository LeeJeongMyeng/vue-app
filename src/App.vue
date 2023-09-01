<template>
  <div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user">UserList</router-link> |
      <router-link to="/user/findById">UserSelect</router-link> |
      <router-link to="/user/editById">UserUpdate</router-link> |
      <router-link to="/user/save">UserCreate</router-link>
    </nav> -->
    <router-view/>
  </div>
</template>

<script>

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
    }
  }
</script>

<style>
@import url(./assets/css/common/common.css);

</style>
