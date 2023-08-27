<template>
  <div class="home">
    <a href="/user">사용자목록</a><br/>
    <button @click="getData">데이터 호출</button>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

const uForm = {no:1,name:'테스트2',email:'test@test.com',pwd:'1234',gender:true};
const params = {
  params:{no:1}
}
export default {
  name: 'HomeView',
  methods:{
    getData(){
      axios.delete('/delete',params)
          .then((response)=>{
            console.log(response)
          }).catch((error)=>{
            console.log(error)
      })
    }
  }
}
</script>

<style scoped>

a{
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
  
}

</style>