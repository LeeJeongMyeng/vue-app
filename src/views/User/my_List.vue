<template>
<div>
  </div>    
            <div class="modal-content" id="My_Info_Container">
            <h1>내 정보 수정</h1>
            <div class="Info_box_Container">
                <!-- 비밀번호 변경 -->
                <div class="Info_box">
                    <h2>비밀번호 변경</h2>
                    <div class='input-group'>
                        <label style="font-size: 14px;" for='pwd_old'> 현재 비밀번호 </label><br/>
                        <input type='password' id='pwd_old' placeholder='현재 비밀 번호 를 입력 해 주세요' maxlength= '20'><br/>
                    </div>

                    <div class='input-group'>
                        <label style="font-size: 14px;" for=' pwd_new '> 새 비밀번호</label><br/>
                        <input type ='password' id =' pwd_new' placeholder =' 새 로운 비 밀 번 호 를 입력 해 주세요' maxlength ='20'><br/>
                    </div>
                    <div class='input-group'>
                        <label style="font-size: 14px;" for =' pwd_new '> 비밀번호 확인</label><br/>
                        <input type ='password' id ='pwd_new' placeholder =' 새 로운 비 밀 번 호 를 입력 해 주세요' maxlength ='20'><br/>
                    </div>
                </div>

                <!-- 주소 변경 -->
                <div class=Info_box>
                 	<h2>주소변경</h2>
                	<input type=text id=address_new placeholder='새로운 주소를 입력해주세요' maxlength=100/><br/>
               </div>

               <!-- 사업자회원 신청 -->
              	<div class='Info_box'>
                	<h2>사업자회원 신청</h2>
                	<input type=text id=business_number placeholder='사업자등록 번호를 입력해주세요' maxlength=12/><br/>
               </div>

            </div>

            <!-- 정보 업데이트 버튼 -->
          	<div class="button-container">
                <button @click='updateUserInfo'>정보 업데이트</button>
            </div>

        </div>
            <div class="modal-content">
                <!-- 닫기 버튼 -->
                <!-- 모달 내용 -->
                <div v-if="Show_My_FleaMarket">
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
                            <tr v-for="item in My_FleaMarket.fleamarketDtoList" :key="item.post_id" >
                                <td style="width: 7%;">{{ item.rownum }}</td> 
                                <td style="width: 51%; text-align: left; padding:5px;">{{ item.title }}</td>
                                <td style="width: 18%;">{{ item.location }}</td>
                                <td style="width: 10%;">{{ item.current_count }}/{{ item.max_applicants }}</td>
                                <td style="width: 10%;"><button class="application_btn reject-button"  @click="get_Detail_FM(item.post_id)">이동</button></td>
                            </tr>
                        </tbody>   
                    </table>
                    </div>
                    <div class="application_nobody" v-else>검색 결과가 없습니다.</div>
                    <div class="pagination-container" v-if="My_FleaMarket.totPage >= 1">
                        <div>
                            <button  @click="prev_F_Page" class="page-btn">
                            prev
                            </button>
                            <span class="page-count">{{ this.$store.state.F_currentPage }} / {{ My_FleaMarket.totPage }}</span>
                            <button  @click="next_F_Page" class="page-btn">
                            next
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
                            <tr v-for="item in My_Application.fleamarketDtoList" :key="item.post_id">
                                <td style="width: 5%;">{{ item.rownum }}</td>
                                <td style="width: 40%; text-align: left; padding:5px;">{{ item.title }}</td>
                                <td style="width: 20%;">{{ item.location }}</td>
                                <td style="width: 10%;">{{ item.state }}</td>
                                <td style="width: 10%;">{{ item.fstate }}</td>
                                <td style="width: 8%;">{{ item.current_count }}/{{ item.max_applicants }}</td>
                                <td style="width: 7%;"><button class="application_btn reject-button"  @click="get_Detail_FM(item.post_id)">이동</button></td>
                            </tr>
                        </tbody>   
                    </table>
                    </div>
                    <div class="application_nobody" v-else>검색 결과가 없습니다.</div>
                    <div class="pagination-container" v-if="My_Application.totPage >= 1">
                        <div>
                            <button  @click="prev_F_Page" class="page-btn">
                            prev
                            </button>
                            <span class="page-count">{{ this.$store.state.A_currentPage }} / {{ My_Application.totPage }}</span>
                            <button  @click="next_F_Page" class="page-btn">
                            next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
   
</template>

<script>
import axios from "axios";
const Myaxios = axios.create();

export default  {
    
    name:'my_List',
    components:{
    },
    computed:{
       user_id() {
            
        }
    },
    created(){
         this.get_check_user_bn();
         //this.get_My_FleaMarket();
         this.get_My_Application();

    },
    
    data() {
        return {
          //내가 쓴 게시글
          Show_My_FleaMarket:false,
          My_FleaMarket:'',
            //내가 신청한 글
          My_Application:'',
          
          UptInfo:{
            password:'',
            phone_number:'',
            postal_code:'',
            address:'',
            extra_address:'',
            detail_address:'',
          }
         

        }
    },
    setup() {

    },
    mounted(){
      
    },
    
    methods:{
        //권한 확인
        get_check_user_bn(){
            Myaxios.post('/ctg/check-user-bn')
            .then((res) => {
                console.log('권한',res)
                this.Show_My_FleaMarket = res.data;
                this.get_My_FleaMarket();
                
            }).catch((error) => {
                console.log(error)
            })
        },
        //페이지 랜더링시 데이터 호출
        get_My_FleaMarket(){
            console.log(this.$store.state.user_id)
            console.log(this.$store.state.F_currentPage)
            const data={
                user_id : this.$store.state.user_id,
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
            console.log(this.$store.state.user_id)
            console.log(this.$store.state.A_currentPage)
            const data = {
                user_id: this.$store.state.user_id,
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
        get_Detail_FM(post_id) {
            console.log(post_id);
            //this.body.post_id
            this.$router.push({ name: 'get_FleaMarket', query: { post_id: post_id } }); //추가한 상세페이지 라우터
        }
    }
}

</script>

<style scoped>
    

/* 모달 */

.Info_box_Container{
display:flex;
flex-direction : row ;
justify-content : center ;
align-items:center;
gap :10 px ;
}

.Info_box{
    width: 355px;
    height: 247px;
    border: 1px solid #000;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 13px;

}

.Info_box>h2{
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
}

.input-group {
display: flex;
width: 100%;
}

.input-group label {
    width: 98px; /* 원하는 너비로 설정 */
    display: inline-block;
}

.Info_box input{
margin-left: 10px;
}

.button-container {
    position: absolute;
    bottom: -149px;
    width: 100%;
    text-align: center;
}


.modal-content {
    position:relative;
    margin: 36px auto;
    width: 1200px;
    min-height: 400px;
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
.modal-content div h1,#My_Info_Container>h1{
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