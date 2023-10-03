<template>
  <main>
    <div class="cardContainer" >
      <hr class="cardBox_hr">
        <div v-if="this.$store.state.currentPage==0" style="height: 500px; display: flex; flex: auto; align-items: center;"> <h1 style="text-align: center; width: 100%; font-size: 20px;">검색 결과 없음</h1></div>

         <div class="cardBox" v-else v-for="item in FleaMarketList.fleamarketDtoList" :key="item">
          <!-- <div style="width: 100%; height: 100%; cursor: pointer;" @click="get_Detail_FM('{{item.fno}}')"> -->
            <div class="card" @click="get_Detail_FM(item.post_id)" style="width: 100%; height: 100%; cursor: pointer;">
                <!-- <img src="C:\Users\TA9\git\vue-app\src\assets\img\fleamarket\c0b45714-d7af-40e8-8327-68bcdf3332c6_다운로드 (3).jpg" alt=""> -->
                <div class="Imgbox">
                  <!-- <img id="cardImg" src='../assets/img/fleamarket/7410a5ff-fdfd-4202-ad90-479df5fe9043_플마3.jpg' alt=""> -->
                <!-- <img id="cardImg" :src="require('@/assets/img/fleamarket/' + item.uuid_file_name)" alt=""> -->
                <img :src="getImageUrl(item.uuid_file_name)" alt="Example Image"> 
              </div>
              <div class="Infobox">
              <h1 class="card_title">{{ item.title }}</h1>
              <h2 class="card_address">위&nbsp;&nbsp;&nbsp;치 👉 {{ item.location }}</h2>
              <h2 class="card_regDate">작&nbsp;성&nbsp;일 👉 {{ item.reg_date }}</h2>
              <h2 class="card_regDate">모집종료일 👉 {{ item.end_date }}</h2>
              <h2 class="card_Cnt">(현재/모집) {{ item.current_count }}/{{ item.max_applicants }} [{{ item.state }}]</h2>
              </div>
          </div>
         </div>
       <hr class="cardBox_hr">  
  </div>
  
  <div class="pagination-container">
    <div >
         <input type="text" v-model="Fleamarket.title" style="width: 300px; border-radius: 5px;" @keyup.enter="search"><button @click="search" style="height: 41px; line-height: inherit; margin: 0 0 0 10px;">검색</button>
    </div>
    <div>
        <button  @click="prevPage" class="page-btn">
          prev
        </button>
        <span class="page-count">{{ this.$store.state.currentPage }} / {{ FleaMarketList.totPage }}</span>
        <button  @click="nextPage" class="page-btn">
          next
        </button>
    </div>
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
    user_id() {
      return this.$store.state.user_id
    }
  },
  created() {
     
  },
 
  data() {
    return {
      FleaMarketList: '', //플리마켓 게시글
      fileList:'',
      Fleamarket: {
        title: '',
        currentPage:'',
        // currentPage:0,
      },
      
    }
  },
  setup() {
  },
  mounted() {
     this.get_FleaMarket_List(1);

  },

  methods: {
    search(){
      this.$store.state.currentPage = 1
      this.get_FleaMarket_List();
    },
    get_FleaMarket_List(){
      //axios매개변수로 쓰도록 넣어줌
        this.Fleamarket.currentPage = this.$store.state.currentPage
        this.$store.state.title = this.Fleamarket.title
      //state에 넣어서 새로고침해도 유지되도록 설정

        
        console.log('start-currentPage', this.$store.state.currentPage);
        console.log('start-currentPage', this.$store.state.title);
        
        axios.post('/ctg/get_FleaMarket_List',this.Fleamarket)
        .then((response) => {
          console.log(response)
          if(response.data.totPage==0){
            this.$store.state.currentPage=0;
          }
          console.log(response.data)

          setTimeout(() => {
            this.FleaMarketList = response.data;
          }, 500);
          

          //this.FleaMarket.totpage = response.data.FleaMarketList.totPage
          

        })
        .catch((error) => {
          console.log(error)
        })
    },
    prevPage(){
      //현재 페이지
      if(this.$store.state.currentPage==1){
        return false;
      }else{
        this.$store.dispatch('MinusCurrentPage');
        this.get_FleaMarket_List();
      }
      
    },
    nextPage() {
      if (this.$store.state.currentPage == this.FleaMarketList.totPage) {
        return false;
      } else {
        this.$store.dispatch('PlusCurrentPage');
        console.log("nextpage", this.$store.state.currentPage);
        this.get_FleaMarket_List();
      }
    },
    get_Detail_FM(post_id){
      console.log(post_id);
      //this.body.fno
      this.$router.push({ name: 'get_FleaMarket', query:{post_id:post_id} }); //추가한 상세페이지 라우터
    },
    getImageUrl(filename) {
      const serverBaseUrl = '';

      return `${serverBaseUrl}/${filename}`;
    },

  }
}
</script>


<style scoped>
.cardContainer{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
   margin: 0 0 0 44px;
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
        margin: 50px 45px;
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

  
  .pagination-container {
  display: flex;
  justify-content: center;
  height: 120px;
  align-items: center; 
  }
.pagination-container *{
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: bold;
}
.page-btn{
  height: 41px;
    line-height: inherit;
}
.cardBox_hr{
  width: 100%;
  border: 1px solid rgb(196, 196, 196);
}

</style>