<template>
    <div id="Notic_Container">
        <h1>공지사항</h1>
        <table class="Notic_Table">
          <thead id="Notic_thead">
            <tr style="height: 32px; font-weight: bold;">
              <th style="width: 10%;">No</th>
              <th style="width: 13%;">중요도</th>
              <th style="width: 48%;">제목</th>
              <th style="width: 15%;">작성일</th>
              <th style="width: 15%;">수정일</th>
            </tr>
          </thead>

          <tbody id="Notic_tbody">
            <tr style="height: 32px; font-weight: bold;" v-for="item in Notic_List.noticList" :key="item.notice_id" @click="get_DetailNotic(item.notice_id)">
                  <td>{{ item.notice_id }}</td>
                  <td>
                    <span v-if="item._important" style="color: red;">중요글</span>
                    <span v-else>일반글</span>
                  </td>
                  <td style="text-align: left;"><span style="color: red;">&#60;공지&#62;</span>{{ item.title }}</td>
                  <td>{{ item.reg_date }}</td>
                  <td>{{ item.upt_date }}</td>
                  <td>{{ item.end_date }}</td>
                </tr>
          </tbody>

        </table>
        <div id="Search_Container">
           <div class="SearchBox">
                <label for ="status-select">검색내용:</label>
                <select id = "status-select" name = "Search_Mode" v-model="Search_Mode">
                    <option value = "1">제목+내용</option>
                    <option value = "2">제목</option>
                    <option value = "3">내용</option>
                </select> 
              <label for="search-input" >검색:</label>
              <input type="text" id="search-input" name="search" @keyup.enter="search" v-model="Search.title">
              <div class="pagination-container">
                <div>
                    <button  @click="prevPage" class="page-btn">
                      prev
                    </button>
                    <span class="page-count">{{ this.$store.state.currentPage }} / {{ Notic_List.totPage }}</span>
                    <button  @click="nextPage" class="page-btn">
                      next
                    </button>
                </div>
              </div>
           </div>  
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default  {
    
    name:'NoticHome',
    components:{

    },
    computed:{
     
    },
    created(){
        
        
        //this.$store.state.currentPage=1

    },
    
    data() {
        return {
            //공지사항 리스트
            Notic_List:'',

            //검색용 데이터
            Search:{
                title:'', 
                Search_Mode : '1',
                currentPage: '',
                
            }
        }
    },
    setup() {

    },
    mounted(){
        // 검색 select태그 활성화
      this.Search_Mode = '1';
      this.get_Notic_List();
    },
    
    methods:{
      search() {
      this.$store.state.currentPage = 1
      this.get_Notic_List();
    },
        //create를 통해서 공지사항 정보 가져오기
        get_Notic_List(){
      console.log('후 curpage', this.$store.state.currentPage)
          this.Search.currentPage = this.$store.state.currentPage
          this.$store.state.title = this.Search.title

            axios.post('/ctg/get_Notic_List',this.Search)
            .then((res) => {
                console.log(res);
                this.Notic_List = res.data;
            }).catch((err) => console.log(err))
        },
        //이전페이지
        prevPage() {
      //현재 페이지
          if (this.$store.state.currentPage == 1) {
            return false;
          } else {
            this.$store.dispatch('MinusCurrentPage');
            this.get_Notic_List();
          }
        },
    //다음페이지
        nextPage() {
          console.log('변경전 curpage',this.$store.state.currentPage)
          if (this.$store.state.currentPage == this.Notic_List.totPage) {
            return false;
          } else {
            this.$store.dispatch('PlusCurrentPage');
            console.log("nextpage", this.$store.state.currentPage);
            this.get_Notic_List();
          }
        },
        //상세조회로 이동
        get_DetailNotic(notice_id){
         
            this.$router.push({ name: 'get_Notic', query: { notice_id } });
        }
    }
}

</script>

<style scoped> 

  #Search_Container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100px;
    justify-content: center;
  }
  #Notic_Container>h1{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding: 28px;
  }

  .SearchBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    width: 1400px;
  }
  .SearchBox label {
     font-size: 17px;
     font-weight:bold;
     margin-right: 5px; 
   }
   
   .SearchBox select {
        margin-right: 45px;
        height: 35px;
        width: 100px;
   }
   .SearchBox input{
    margin-right: 45px;
        height: 27px;
        width: 200px;
   }


 #Notic_Container {
     margin: auto;
     width: 1900px;
     min-height: 600px;

 }

 .Notic_Table {
    table-layout: fixed;
    width: 80%;
    margin: 0 auto;
     border: 1px solid #ccc;
     border-collapse: collapse;
 }

 #Notic_thead{
     padding: .5rem;
     color: white;
      background-color: rgb(56, 56, 56);
    
 }


 
.Notic_Table td {
    text-align:center;
     border-bottom: 1px solid #ccc;
} 



 </style> 