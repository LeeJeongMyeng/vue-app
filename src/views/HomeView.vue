<template>
  <!-- <div class="home">
    <a href="/user">Contigo</a><br/>
    <button @click="getData">데이터 호출</button>
  </div> -->
  
  <main>
    <div class="cardContainer">
        <Card />
      <Card />
      <Card />
        <Card />
        <Card />
        <Card />
    </div>

  </main>
</template>

<script>
// @ is an alias to /src

import Card from "@/components/Card.vue";
import axios from "axios";

const uForm = {no:1,name:'테스트2',email:'test@test.com',pwd:'1234',gender:true};
const params = {
  params:{no:1}
}
export default {
    name: 'HomeView',
    methods: {
    // getData(){
    //   axios.delete('/delete',params)
    //       .then((response)=>{
    //         console.log(response)
    //       }).catch((error)=>{
    //         console.log(error)
    //   })
    // }
    },
    components: { Card }
}
</script>


<style scoped>
.cardContainer{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
a{
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
}
main{
  background-color: greenyellow;
  width:80%;
  margin : 0 auto;
}

</style>