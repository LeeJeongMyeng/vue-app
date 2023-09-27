<template>
<div>
  </div>    
            <div class="modal-content" id="My_Info_Container">
            <h1>내 정보</h1>
            <hr>
            <div class="Origin_Info_box">
                <table class="Origin_Info_Table_L">
                    <tr><th>회원번호</th><td>{{ My_Info.user_id }}</td></tr>
                    <tr><th>이름</th><td>{{ My_Info.name }}</td></tr>
                    <tr><th>이메일</th><td>{{ My_Info.email }}</td></tr>
                    <tr><th>전화번호</th><td>{{ My_Info.phone_number }}</td></tr>
                </table>
            
                <table class="Origin_Info_Table_R">
                    <tr><th>가입유형</th><td>{{ My_Info._business ? '사업자회원' : '일반회원' }}</td></tr>
                    <tr><th>가입일자</th><td>{{ My_Info.join_date }}</td></tr>
                    <tr><th>주소</th><td>{{ My_Info.address }}</td></tr>
                </table>
            </div>
            <hr>
            <h1 style="padding: 10px;">회원정보 수정</h1>
            <h1 style="font-size: 15px; color: red;">*원하는 항목만 기입 후 수정*</h1>
            <div class="Info_box_Container">
                <!-- 비밀번호 변경 -->
                <div class="Info_box">
                    <h2>비밀번호 변경</h2>
                    <div class='input-group'>
                        <label style="font-size: 14px;" for='pwd_old'> 현재 비밀번호 </label><br/>
                        <input type='password' id='pwd_old' v-model="password" :class="active_css.password1" placeholder='현재 비밀번호를 입력 해 주세요' maxlength= '20'><br/>
                    </div>

                    <div class='input-group'>
                        <label style="font-size: 14px;" for=' pwd_new '> 새 비밀번호</label><br/>
                        <input type ='password' id =' pwd_new' v-model="updateUserInfo.password" :class="active_css.password2" placeholder =' 새로운 비밀번 를 입력 해 주세요' maxlength ='20'><br/>
                    </div>
                    <div class='input-group'>
                        <label style="font-size: 14px;" for =' pwd_new '> 비밀번호 확인</label><br/>
                        <input type ='password' id ='pwd_new2' v-model="updateUserInfo.password2" :class="active_css.password3" placeholder =' 새로운 비밀번호를 입력 해 주세요' maxlength ='20'><br/>
                    </div>
                    <button class="uptBtn" style="margin: 40px auto 0 auto;" @click='update_UserInfo'>수정하기</button>
                </div>

                <!-- 주소 변경 -->
                <div class=Info_box>
                 	<h2>주소변경</h2>
                    <div style="display: flex;">
                        <input type="text" id="sample6_postcode" placeholder="우편번호" readonly>
                        <input  type="button" id="sample6_btn" @click="sample6_execDaumPostcode()" value="우편번호 찾기" style="width: 100px; height: 28px;" ><br>
                        </div> 
                        <input type="text" id="sample6_address" placeholder="주소" style="width: 94%; margin-top: 10px;" readonly><br>
                        <input type="text" id="sample6_detailAddress" placeholder="상세주소" style="width: 94%;">
                        <input type="text" id="sample6_extraAddress" placeholder="참고항목" style="width: 94%;  margin-top: 10px;" readonly>
                        <button class="uptBtn" style="margin: 25px auto 0 auto" @click='update_UserInfo'>수정하기</button>
               </div>

               <!-- 사업자회원 신청 -->
              	<div class='Info_box'>
                	<h2>전화번호</h2>
                    <input type="text" id="SignUp_phonenumber" @keyup="Check_PN_Regular" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" minlength="10" maxlength="11" style="width: 320px;">               	
                    <button class="uptBtn" style="margin: 11px auto" @click='update_UserInfo'>수정하기</button>
                    <h2>사업자회원 신청</h2>
                	<input type=text id=business_number placeholder='사업자등록 번호를 입력해주세요' style="width: 320px;" maxlength=12/><br/>
                    <button class="uptBtn" style="margin: 6px auto" @click='update_UserInfo'>등록</button>
               </div>

            </div>

            <!-- 정보 업데이트 버튼 -->
          	

        </div>
            <div class="modal-content" style="min-height: 400px;">
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
         this.get_My_Info();
         this.get_check_user_bn();
         this.get_My_Application();
    },
    
    data() {
        return {
          //내가 쓴 게시글
          Show_My_FleaMarket:false,
          My_FleaMarket:'',
            //내가 신청한 글
          My_Application:'',
          //내정보
          My_Info:{
            user_id:'',
            name:'',
            email:'',
            phone_number:'',
            address:'',
            _business:false,
            join_date:''
          },
        //수정될 데이터
          updateUserInfo:{
            password:'',
            password2:'',
            postal_code:'',
            address:'',
            extra_address:'',
            detail_address:'',
            phone_number:'',
            business_number:''
          },
           active_css: {
                 password: ''
                , password2: ''
                , password3: ''
                , phoneNumber: ''
                , bnNumber: ''
          },
          password:'',
         

        }
    },
    setup() {

    },
    mounted(){
      
    },
    
    methods:{
        //내 정보 들고오기
        get_My_Info(){
            const data = {
                user_id: this.$store.state.user_id
            }
            axios.post('/ctg/get_My_Info',data)
            .then((res) =>{
                console.log('get_My_Info',res);
                this.My_Info = res.data
            }).catch((error)=>{
                console.log(error);
            })

        
        },
        //권한확인
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
         get_My_Application() {
            const data = {
                user_id: this.$store.state.user_id,
                currentPage: this.$store.state.A_currentPage
            }
            axios.post('/ctg/get_My_Application', data)
                .then((res) => {
                    console.log('get_My_Application', res)
                    this.My_Application = res.data
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
        },
        //수정 버튼 누르면 현재 비밀번호부터 확인
        update_UserInfo(){
            const data={
                user_id : this.My_Info.user_id,
                password: this.password
            }
            axios.post('/ctg/Check_Password',data)
            .then((res)=>{
                console.log(res.data)
                if(res.data){
                    $('#pwd_old').attr('readOnly',true);
                    this.active_css.password1 = 'active_valid';
                    this.Check_Pwd_Regular()
                }else{
                    alert('현재 비밀번호가 일치하지 않습니다.')
                    this.active_css.password1 = 'active_invalid';

                }
            }).catch((error)=>{
                console.log(error);
            })
        },

        //  // 비밀번호 양식확인
        Check_Pwd_Regular() {
            const pwd = this.updateUserInfo.password
            const check = this.Check_Regular_Expression('password', pwd);
            const check2 = this.password == this.updateUserInfo.password

            //비번 같을경우
            if(check2){
                alert('기존 비밀번호와 다르게 설정하셔야합니다.')
                this.active_css.password2 = 'active_invalid';
                return false;
            }
            //비번 양식이 맞는지 확인
            if(check) {
                this.active_css.password2 = 'active_valid';
                this.Check_Pwd_Regular2()
            } else {
                this.active_css.password2 = 'active_invalid';
                alert('비밀번호는 8~16자 영어/특수문주/숫자 중 2가지 이상입니다.')
            }

        },
        // 비밀번호 확인
        Check_Pwd_Regular2(){
            let Check = this.updateUserInfo.password == this.updateUserInfo.password2;
            if (Check) {
                this.active_css.password3 = 'active_valid';
            } else {
                this.active_css.password3 = 'active_invalid';
                alert('비밀번호가 일치하지 않습니다.')
            }
        },

         //정규식검사 메서드
        Check_Regular_Expression(key, value) {
            let Regular_Expression = '';
            let result = false;
            if (key == 'email') {
                Regular_Expression = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[.0-9a-zA-Z])*.[a-zA-Z]$/i;
                result = (Regular_Expression.test(value) && value != '');
            } else if (key == 'rrn') {
                Regular_Expression = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
                result = (value.length == 14 && (Regular_Expression.test(value)));
                console.log(value.length + ':' + Regular_Expression.test(value));
            } else if (key == 'password') {
                const pw = value;
                const num = pw.search(/[0-9]/g); //숫자확인
                const eng = pw.search(/[a-z]/ig); //영어확인
                const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩';:₩/?]/gi); //특수문자확인
                if (pw.length < 8 || pw.length > 16) { //비밀번호 길이확인
                    result = false;
                } else if (pw.search(/\s/) != -1) { //공백확인
                    result = false;
                } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) { //두가지 조합 혼합 확인
                    result = false;
                } else {
                    result = true;
                }
            } else if ('PhoneNumber') {
                Regular_Expression = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
                result = ((value.length == 11 || value.length == 10) && (Regular_Expression.test(value)));
            }

            return result;

        },
    }
}

</script>

<style scoped>
.Origin_Info_box {
    min-height: 50px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    padding: 10px;
}

.Origin_Info_Table_L, .Origin_Info_Table_R {
    width: 30%;
}
.Origin_Info_Table_L th, .Origin_Info_Table_R th {
    text-align: right; /* <th> 요소의 글자를 오른쪽 정렬 */
    border-right: 1px solid;
    font-weight: bolder;
}
.Origin_Info_Table_L th, .Origin_Info_Table_R th,.Origin_Info_Table_L td, .Origin_Info_Table_R td{
    padding:7px 12px;
}
/* 모달 */

.uptBtn{
    margin: 10px auto;
    width: 80px;
    height: 30px;
    font-weight: bolder;
    font-size: 15px;
    background: #df2bdf;
    color: white;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 3px black;
}

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
    /* align-items: center; */
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
    align-items: center;
    margin: 8px auto;
}

.input-group label {
    width: 98px; /* 원하는 너비로 설정 */
    display: inline-block;
}

.Info_box input{
    margin-left: 10px;
    width: 222px;
    height: 21px;   

}





.modal-content {
    position:relative;
    margin: 36px auto;
    width: 1200px;
    min-height: 660px;
    border-radius: 15px;
    background-color: #ffffff;
    /* border: 2px solid; */
    box-shadow: 0 0 7px black;
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
    height: 29%;
}
.modal-content>div>button{
    width: 200px;
    height: 38px;
    border-radius: 5px;
    border:none;
    box-shadow:  0 0 3px black;
    background: rgb(194, 31, 194);
    color: white;
    font-weight: bolder;
    font-size: 15px;
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

/* ============================================================================== */
/* 유효성 검사용 스타일 */
.active_invalid{
    
    box-shadow: 0px 0px 4px rgb(255, 0, 0);
}

.active_valid{
     box-shadow: 0px 0px 6px rgb(57, 182, 80);
}

</style>