<template>
<div>
  </div>
            <div class="modal-content">
                <!-- 닫기 버튼 -->
                    <button type="button" class="close-button" @click="closeModal">X</button>
                <!-- 모달 내용 -->
                <div>
                <h1>내가 쓴 플리마켓</h1>
                    <table class="modal_application_tableH">
                        <thead>
                            <tr>
                            <th class="application_table_th" style="width: 7%;">No</th>
                            <th class="application_table_th" style="width: 51%;">글제목</th>
                            <th class="application_table_th" style="width: 18%;">행사위치</th>
                            <th class="application_table_th" style="width: 10%;">현재/정원</th> 
                            <th class="application_table_th" style="width: 10%;">게시글이동</th> 
                            </tr>
                        </thead>
                    </table>
                    <div class="application_tbody" v-if="My_FleaMarket.totPage>=1">
                    <table class="modal_application_table">
                    <tbody>
                            <tr v-for="item in My_FleaMarket.fleamarketDtoList" :key="item.fno" >
                                <td style="width: 7%;">{{ item.fno }}</td> 
                                <td style="width: 51%;">{{ item.title }}</td>
                                <td style="width: 18%;">{{ item.address }}</td>
                                <td style="width: 10%;">{{ item.curCnt }}/{{ item.approvalCnt }}</td>
                                <td style="width: 10%;"><button class="application_btn reject-button"  @click="get_Detail_FM(item.fno)">이동</button></td>
                            </tr>
                        </tbody>   
                    </table>
                    </div>
                    <div class="application_nobody" v-else>?</div>
                    <div class="pagination-container" v-if="My_FleaMarket.totPage >= 1">
                        <div>
                            <button  @click="prev_F_Page" class="page-btn">
                            이전
                            </button>
                            <span class="page-count">{{ this.$store.state.F_currentPage }} / {{ My_FleaMarket.totPage }} 페이지</span>
                            <button  @click="next_F_Page" class="page-btn">
                            다음
                            </button>
                        </div>
                    </div>
                    
                </div>
                <div>
                <h1>내가 신청한 플리마켓</h1>
                    <table class="modal_application_tableH">
                        <thead>
                            <tr >
                            <th class="application_table_th" style="width: 5%;">No</th>
                            <th class="application_table_th" style="width: 40%;">글제목</th>
                            <th class="application_table_th" style="width: 20%;">행사위치</th>
                            <th class="application_table_th" style="width: 10%;">승인상태</th>
                             <th class="application_table_th" style="width: 10%;">게시상태</th>
                            <th class="application_table_th" style="width: 8%;">현재/정원</th> 
                            <th class="application_table_th" style="width: 7%;">이동</th> 
                            </tr>
                        </thead>
                    </table>
                    <div class="application_tbody" v-if="My_Application.totPage>=1">
                    <table class="modal_application_table">
                    <tbody>
                            <tr v-for="item in My_Application.fleamarketDtoList" :key="item.fno">
                                <td style="width: 5%;">{{ item.fno }}</td>
                                <td style="width: 40%;">{{ item.title }}</td>
                                <td style="width: 20%;">{{ item.address }}</td>
                                <td style="width: 10%;">{{ item.state }}</td>
                                <td style="width: 10%;">{{ item.fstate }}</td>
                                <td style="width: 8%;">{{ item.curCnt }}/{{ item.approvalCnt }}</td>
                                <td style="width: 7%;"><button class="application_btn reject-button"  @click="get_Detail_FM(item.fno)">거절</button></td>
                            </tr>
                        </tbody>   
                    </table>
                    </div>
                    <div class="application_nobody" v-else>검색 결과가 없습니다.</div>
                    <div class="pagination-container" v-if="My_Application.totPage >= 1">
                        <div>
                            <button  @click="prev_F_Page" class="page-btn">
                            이전
                            </button>
                            <span class="page-count">{{ this.$store.state.A_currentPage }} / {{ My_Application.totPage }} 페이지</span>
                            <button  @click="next_F_Page" class="page-btn">
                            다음
                            </button>
                        </div>
                    </div>
                </div>
            </div>
   
</template>

<script>
import axios from "axios";

export default  {
    
    name:'my_List',
    components:{
    },
    computed:{
       member() {
            
        }
    },
    created(){
         this.get_My_FleaMarket();
         this.get_My_Application();
    },
    
    data() {
        return {
            //내가 쓴 게시글
          My_FleaMarket:'',
            //내가 신청한 글
          My_Application:'',
         

        }
    },
    setup() {

    },
    mounted(){
      
    },
    
    methods:{
        //페이지 랜더링시 데이터 호출
        get_My_FleaMarket(){
            console.log(this.$store.state.member.userno)
            console.log(this.$store.state.F_currentPage)
            const data={
                userno : this.$store.state.member.userno,
                currentPage: this.$store.state.F_currentPage
            }
            axios.post('/ctg/get_My_FleaMarket',data)
                .then((res) => {
                    console.log('get_My_FleaMarket',res)
                    this.My_FleaMarket = res.data
                })
                .catch((err) => console.log(err))
        },
        prev_F_Page() {
            //현재 페이지
            if (this.$store.state.F_currentPage == 1) {
                return false;
            } else {
                this.$store.dispatch('Minus_F_CurrentPage');
                this.get_My_FleaMarket();
            }

        },
        next_F_Page() {
            if (this.$store.state.F_currentPage == this.My_FleaMarket.totPage) {
                return false;
            } else {
                this.$store.dispatch('Plus_F_CurrentPage');
                console.log("nextpage", this.$store.state.F_currentPage);
                this.get_My_FleaMarket();
            }
        },
        get_My_Application() {
            console.log(this.$store.state.member.userno)
            console.log(this.$store.state.A_currentPage)
            const data = {
                userno: this.$store.state.member.userno,
                currentPage: this.$store.state.A_currentPage
            }
            axios.post('/ctg/get_My_Application', data)
                .then((res) => {
                    console.log('get_My_Application',res)
                    this.My_Application = res.data
                })
                .catch((err) => console.log(err))
        },
        prev_A_Page() {
            //현재 페이지
            if (this.$store.state.F_currentPage == 1) {
                return false;
            } else {
                this.$store.dispatch('Minus_A_CurrentPage');
                this.get_My_Application();
            }
        },
        next_A_Page() {
            if (this.$store.state.A_currentPage == this.My_Application.totPage) {
                return false;
            } else {
                this.$store.dispatch('Plus_A_CurrentPage');
                console.log("nextpage", this.$store.state.A_currentPage);
                this.get_My_Application();
            }
        },
        get_Detail_FM(fno) {
            console.log(fno);
            //this.body.fno
            this.$router.push({ name: 'get_FleaMarket', query: { fno: fno } }); //추가한 상세페이지 라우터
        }
    }
}

</script>

<style scoped>
    

/* 모달 */

.modal-overlay {
}

.modal-content {
    margin: 0 auto;
    width: 1200px;
    height: 800px;
    border-radius: 15px;
    background-color: #ffffff;
    /* border: 2px solid; */
    box-shadow: 0 0 10px black;
    padding: 16px;
}
.close-button {
  position:absolute; 
  top:-10px; 
  right:-10px;

  display:flex; 
  align-items:center; 
  justify-content:center;

  width :30px ; 
  height :30px ; 
  
  border-radius :50% ;
  
  font-size :14px ; 
}

.modal_application_table {
   width: 100%;
   margin:0px auto;
}
.modal_application_tableH {
   width: 100%;
   margin:0px auto;
}
.modal-content>div{
    height: 49%;
    /* border-bottom: 1px solid; */
    
}
.application_tbody{
    height: 251px;
}   
.modal-content div h1{
    text-align: center;
    font-size: 27px;
    margin: 10px auto;
    font-weight: bold;
}

.modal_application_table .application_table_th,.modal_application_tableH .application_table_th {
   height: 25px;
   background-color: rgb(77, 77, 77);
   color: white;
   text-align:center;
   vertical-align:middle;
}

.modal_application_table td,
.modal_application_table th {
   border: 1px solid #000;
    text-align:center;
   vertical-align :middle;
   
}

.modal_application_table tbody tr{
    height: 25px;
}

.application_btn{
    margin: 0px 5px;
}


.application_btn{
  background: black;
  color: white;
  border: none;
  margin: 0px 5px;
  border-radius: 4px;
}

.approve-button {
  background-color: #4CAF50; /* 녹색 */
}

 .pagination-container {
  display: flex;
  justify-content: center;
  height: 72px;
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
  height: 30px;
    line-height: inherit;
}
.application_nobody{
    /* background: red; */
    text-align: center;
    padding: 150px;
    font-size: 18px;
    font-weight: bold;
}

</style>