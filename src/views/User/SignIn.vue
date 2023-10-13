<template>
    <div class="signInContainer">
        <div class="signInBox">
            <h1>Sign in to Contigo</h1>
            
            <div class="signIn_Input">
                <ul id="signIn_Email_tag">
                    <li>Email</li>
                    <!-- <li>아이디 찾기</li> -->
                </ul>
                <input type="text" id="SignIn_id" placeholder="Enter your Email" v-model="User.email"><br>
                <ul id="signIn_Pwd_tag">
                    <li>password</li>
                     <!-- <li>비밀번호찾기</li> -->
                </ul>
                <input type="password" id="SignIn_pwd" v-model="User.password" @keyup.enter="SignIn" autocomplete="off"><br>
                <ul class="reset_Password_Btn"><li @click="openModal">비밀번호 재설정</li></ul>
                <button type="button" class="SignIn_btn" @click="SignIn">로그인</button>
            </div>
            <button type="button" class="SignUp_btn" @click="Go_To_SignUp">회원가입</button>
        </div>
        <div class="imgBox">
           <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg" alt="">
           <h4>콘티고와 함께하는 새로운<br> 여정의 시작을 환영합니다.</h4>
        </div>
    </div>




    <div v-if="isModalOpen" class="modal">
                <div class="modal-overlay" @click="closeModal"></div> <!-- 모달 배경 -->

                <div class="modal-content">
                    <!-- 닫기 버튼 -->
                        <button type="button" class="close-button" @click="closeModal">X</button>
                    <!-- 모달 내용 -->
                    <div>
                        <h1>비밀번호 재설정</h1>
                        <hr>
                        <h2>*가입시 등록하신 이메일과 성함 확인을 하여 해당 이메일로 <span style="color:red">비밀번호 변경할 수 있는 URL이 전송</span>됩니다.</h2>
                        <div class="reset_input_box">
                            <div >
                                <span style="padding:13px;">이름</span>
                                <input type="text" id="reset_Name_input" placeholder="홍길동" v-model="reset_UserInfo.name"><br>
                            </div>
                            <div>
                                <span style="padding: 5px;">이메일</span>
                                <input type="text" id="reset_Password_input" style="width:300px;" placeholder="contigo@contigo.com" v-model="reset_UserInfo.email"><br>
                            </div>
                            <button @click="reset_Password">비밀번호 재설정</button>
                        </div>
                    
                    </div>
                   
                    
                </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name : "signIn",
    data() {
        return {
            User:{
                email : '' ,
                password : ''
            },
             //모달
            isModalOpen: false,
            reset_UserInfo:{
                name : '',
                email : '',
            }
        }
    },
    created(){
        
    },
    methods: {
        
        Go_To_SignUp(){
             this.$router.push({ name: 'signUp' })
        },
        SignIn(){
            let Check = this.Check_Regular_Expression('email', this.User.email);
            if(Check){
             axios.post('/ctg/SignIn_Ctg_Member', this.User)
                .then((res) => {
                    console.log(res.data)

                     this.$store.commit('setAccount',res.data.user_id);
                     this.$store.dispatch('ctl_Log_Btn',true);
                    if(res.data._business){
                        const user_id = res.data.user_id
                        const business_number = res.data.business_number;
                         this.Check_Business_Number(user_id, business_number);
                    }else{
                            window.alert('로그인되었습니다.');
                            this.$router.push({ name: 'home' })
                    }

                    
                }).catch((err) => {console.log(err)})
            }else{
                alert('올바른 이메일 양식 입력 부탁드립니다.')
            }
        },

        //  //사업자번호 확인 API
        Check_Business_Number(user_id,business_num) {
             var business_number = business_num.replaceAll('-', '');
            var data = { "b_no": [business_number] };
            
            axios.post("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=qaJs1GHTyoLGcztYwOmuuQrV8qrgsos8R3r%2FpIQdyqX2HWAX%2Fy8tlU33sKXL0L0XkV%2FBAGqk8BT8KMVPoZn25g%3D%3D", data)
                .then((result) => {
                    const b_stt = result.data.data[0].b_stt;
                    console.log(b_stt);
                    if (b_stt != '계속사업자') {
                       business_num = '';
                       this.update_business_number(user_id, business_num);
                    }else{
                        window.alert('로그인되었습니다.');
                        this.$router.push({ name: 'home' })
                    }
                })
                .catch((err) => console.log(err))
        },
        update_business_number(user_id, business_number){
            const data = {
                'user_id': user_id,
                'business_number': business_number
            }
            axios.post('/ctg/update_business_number',data)
            .then((res) => {
                window.alert('로그인되었습니다.');
                this.$router.push({ name: 'home' })
            }).catch((error) => {
                console.log(error)
            })
        },
        //중복 검사
       
        //정규식검사 메서드
        Check_Regular_Expression(key, value) {
            let Regular_Expression = '';
            let result = false;
            if (key == 'email') {
                Regular_Expression = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[.0-9a-zA-Z])*.[a-zA-Z]$/i;
                result = (Regular_Expression.test(value) && value != '');
            } 
            

            return result;

        },
        // 모달 열기
        openModal() {
            this.reset_UserInfo.name = '';
            this.reset_UserInfo.email = '';
            this.isModalOpen = true;
            

        },
        // 모달 닫기
        closeModal() {
            this.isModalOpen = false;

        },
        //비밀번호 재설정 이전, 존재확인
        reset_Password(){
            const data = {
                email : this.reset_UserInfo.email,
                name : this.reset_UserInfo.name,
                method: 'Check_Info1'
            }

            axios.post('/ctg/Check_Info',data)
            .then((res) => {

                alert(res.data);
                this.isModalOpen = false;
                
            }).catch((error) => {

                console.log(error);

            })

        },
       
    }
}
</script>

<style scoped>
/*signIn컨테이너 전체 */
    .signInContainer{
        display: flex;
        margin-top: -7px;
        /* min-width:2000px; */
    }

    /* ============================================================================================================================================== */
    /* 왼쪽 로그인 박스 */
    .signInContainer .signInBox{
        position: relative; 
        width: 110%; 
        height: 80vh;  
        
        padding: 20px;
    }

    .signInContainer .signInBox h1{
        text-align: center;
        margin-top: 125px;
        font-size: 28px;
        font-weight: bold;
       
    }
    .signInContainer .signInBox .signIn_Input{
        position: absolute;
        top: 31%;
        left: 28%;
        padding: 26px;
        border-radius: 9px;
        border: 1px solid rgb(173, 173, 173);
        background: rgb(248, 228, 248);
    }


    .signInContainer .signInBox input{
        width:400px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid rgb(173, 173, 173);
        margin: 20px 0;
    }
    #signIn_Email_tag,#signIn_Pwd_tag{
        justify-content: space-between;
        font-weight: bold;
        font-size: 15px;
    }
    .signInContainer .signInBox ul{
        display: flex;
    }

    .signInContainer .signInBox .SignIn_btn{
        width: 400px;
        height: 40px;
        background: rgb(170, 250, 184);
        border: 1px solid rgb(173, 173, 173);
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        margin: 7px 0;
        color: rgb(90, 90, 90);
    }
     .signInContainer .SignUp_btn{
        position: absolute;
        top: 75%;
        left: 25%;
         border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        width: 466px;
        height: 60px;
        margin-left: 28px;
        border: 1px solid rgb(173, 173, 173);
        background: none;
     }
    /* ============================================================================================================================================== */
    /* 오른쪽 이미지박스 */
    .signInContainer .imgBox{
        width:90%; 
        position: relative;
        
    }

    .signInContainer .imgBox img{
        /* width: 100%; */
    }
    .signInContainer .imgBox h4{
           position: absolute;
            top: 45%;
            left: 34%;
            color: white;
            font-size: 25px;
            font-weight: bold;
            line-height: 200%;
    }

    .reset_Password_Btn{

       display: flex;
    justify-content: flex-end; 
    margin: 5px 0;
    }

    .reset_Password_Btn li{
        font-size: 13px;
        cursor: pointer;
        font-weight: bolder;
    }
    .reset_Password_Btn li:hover{
        text-decoration: underline;
    }




    /* 모달 */.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.modal-overlay {
   position: fixed;
   top:0;
   left:0;
   width:100%;
   height:100%;
   background-color:#000000;
   opacity:.2;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,83%);
    width: 800px;
    height: 322px;
    border-radius: 15px;
    background-color: #ffffff;
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

.modal-content div h1{
    text-align: center;
    font-size: 27px;
    margin: 20px auto;
    font-weight: bold;
}

.modal-content div h2{
    text-align: center;
    font-weight: bolder;
    margin: 25px 0;
}

.reset_input_box{
    display: flex;
  justify-content: center; /* 가로축 중앙 정렬 */
  align-items: center; /* 세로축 중앙 정렬 */
   flex-direction: column; /* 자식 요소들을 세로 방향으로 배열 */
  
}

.reset_input_box>div{
    width: 400px;
}

.reset_input_box>div span{
    width: 53px;
    font-weight: bolder;
}

.reset_input_box input{
   
    height: 33px;
    border-radius: 5px;
    border: 1px solid gray;
    margin: 10px 0;
}

.reset_input_box button{
    margin: 16px 0;
    height: 33px;
    border-radius: 5px;
    border: 1px solid gray;
    color: white;
    font-weight: bolder;
    background: #c43ec4;
    box-shadow: 0 0 3px black;
}

</style>