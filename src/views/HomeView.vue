<template>
  <!-- <div class="home">
    <a href="/user">Contigo</a><br/>
    <button @click="getData">데이터 호출</button>
  </div> -->
  
  <main>
    
    <!-- <div class="cardContainer" v-for="item in FleaMarketList" :key="item"> -->
    <div class="cardContainer" >
         <div class="cardBox" v-for="item in FleaMarketList" :key="item">
          <!-- <div style="width: 100%; height: 100%; cursor: pointer;" @click="get_Detail_FM('{{item.fno}}')"> -->
          <div class="card" style="width: 100%; height: 100%; cursor: pointer;">
              <!-- <img src="C:\Users\TA9\git\vue-app\src\assets\img\fleamarket\c0b45714-d7af-40e8-8327-68bcdf3332c6_다운로드 (3).jpg" alt=""> -->
              <div class="Imgbox">
                <!-- <img id="cardImg" src='../assets/img/fleamarket/7410a5ff-fdfd-4202-ad90-479df5fe9043_플마3.jpg' alt=""> -->
               <img id="cardImg" :src="require('@/assets/img/fleamarket/' + item.uuid_file_name)" alt="">

              
              </div>
            <div class="Infobox">
            <h1 class="card_title">{{ item.title }}</h1>
            <h2 class="card_address">{{ item.address }}</h2>
            <h2 class="card_regDate">작성일 : {{ item.regDate }}</h2>
            <h2 class="card_Cnt">(현재/모집) {{ item.curCnt }}/{{ item.approvalCnt }}</h2>
            </div>
         </div>
         </div>
        <!-- {{ this.FleaMarketList }} -->
     
  </div>

  </main>
</template>

<script>
// @ is an alias to /src

import Card from "@/components/Card.vue";
import axios from "axios";


export default {
    name: 'HomeView',
    components: {
  },
  computed: {
    member() {
      return this.$store.state.member
    }
  },
  created() {
    this.get_FleaMarket_List();
  },

  data() {
    return {
      FleaMarketList: '', //플리마켓 게시글
      fileList:'',
      Fleamarket: {
        title: ''
      }
    }
  },
  setup() {
  },
  mounted() {
  },

  methods: {
    get_FleaMarket_List(){
        console.log('시작');
        axios.post('/ctg/get_FleaMarket_List',this.Fleamarket)
        .then((response) => {
          console.log(response.data.FleamarketDtoList)
          this.FleaMarketList = response.data.FleamarketList.fleamarketDtoList
        })
        .catch((error) => {
          console.log(error)
        })
    }


  }
}
</script>


<style scoped>
.cardContainer{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
a{
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
}
main{
  /* background-color: greenyellow; */
  width: 87%;
  margin : 0 auto;
}
.cardBox{
        width : 400px;
        height: 400px;
        /* background: gray; */
        padding : 10px;
        margin: 50px 10px;
        flex-wrap: wrap;
        overflow: hidden;
        /*border: 1px solid; */
        box-shadow: 0 0 7px black;
    }
    .card{
      width: 100%;
      height: 100%;
      cursor: pointer;
      display: flex;
      flex-flow: column;
      /* border: 1px solid; */
    }
    .Imgbox{
      display: flex;
    /* background: red; */
      width: 99%;
      height: 280px;
      border: 1px solid;
      overflow: hidden;
    }
    #cardImg{
      width: 100%;
      height: 280px;
      /* border: 1px solid; */
    }
    .cardBox:hover #cardImg{
      transform: scale(1.2);
      transition: all 0.2s;
    }

    .Infobox{
      margin: 5px 0 0 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    }

    .card_title{
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }
    .card_address{
      font-weight: bold;
      padding: 10px 0 0 
    }
    .card_regDate{
      font-weight: bold;
      padding: 10px 0 0 
    }
    .card_Cnt{
      text-align: end;
      font-weight: bold;
      padding: 10px 0 0 
    }
</style>