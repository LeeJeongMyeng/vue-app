<template>
    <div class="signInContainer">
        <div class="signInBox">
            <h1>{{ UserInfo.email }} ({{ UserInfo.name }}) 님 비밀번호 변경</h1>
            
            <div class="signIn_Input">
                <ul id="signIn_Email_tag">
                    <li>비밀번호<span>8~16자 영어/숫자/특수문자 중 2가지 이상 조합</span></li>
                </ul>
                <input type="password" id="SignIn_id" placeholder="" v-model="UserInfo.password" :class="active_css.password" @keyup="Check_Pwd_Regular" autocomplete="off"><br>
                <ul id="signIn_Pwd_tag">
                    <li>비밀번호확인</li>
                </ul>
                <input type="password" id="SignIn_pwd" v-model="password2" @keyup.enter="SignIn" :class="active_css.password2"  @keyup="Check_Pwd_Regular2" autocomplete="off"><br>
                <button type="button" class="upt_password_btn" @click="Update_Password">변경완료</button>
            </div>
        </div>
        <div class="imgBox">
           <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg" alt="">
           <h4>콘티고와 함께하는 새로운<br> 여정의 시작을 환영합니다.</h4>
        </div>
    </div>
</template>

<script>
import axios from "axios";
const Myaxios = axios.create();

export default {
    name : "Update_Paaword",
    data() {
        return {
            UserInfo:{
                email:'',
                name: '',
               user_id:'',
               password:''
            },
            password2:'',
            Check:{
                password:false,
                password2:false,
            },
            active_css: {
                 password: ''
                , password2: ''
            },
            ut:''
        }
    },
    created(){
        this.ut = this.$route.query.ut;
        this.setting_UserInfo();

    },
    methods: {
        //url접속시 회원정보 세팅
        setting_UserInfo(){
            if(this.ut!=''){
                const data = {
                    token: this.ut
                }
                Myaxios.post('/ctg/set_UserInfo_For_UptPassword',data)
                .then((res) => {
                    console.log(res)
                    this.UserInfo.user_id = res.data.user_id;
                    this.UserInfo.email = res.data.email;
                    this.UserInfo.name = res.data.name;

                }).catch((error) => {
                    
                    console.log(error)
                    if(error.response.status==404){
                            alert(error.response.data);
                            this.$router.push({ name: 'home' });
                    }else if(error.response.status ==401){
                        
                        this.resend_PasswordReset_Request(error.response.data);
                    }
                    
                    
                })
            } else{
                alert('잘못된 접근입니다.');
                this.$router.push({ name: 'home' });
            }
            
        },
        //토큰 만료시 비밀번호 변경 url재요청
        resend_PasswordReset_Request(ErrorData){
            if(confirm( ErrorData.message +'변경 재요청 하시겠습니까?' )){
               
                const data ={
                    user_id : ErrorData.user_id
                }

                Myaxios.post('/ctg/resetPassword',data)
                .then((res) => {
                    
                            alert(res.data);
                            this.$router.push({ name: 'home' });

                }).catch((error) =>{
                    console.log(error);
                })


            }else{
                 this.$router.push({ name: 'home' });
            }
        },
        Update_Password(){
            const check = (this.Check.password && this.Check.password2);
           if(check){
            Myaxios.post('/ctg/Update_Password_for_uuid', this.UserInfo)
                    .then((res) => {

                        alert('변경완료 되었습니다. 새로운 비밀번호로 로그인 부탁드립니다.')
                        this.$router.push({ name: 'SignIn' })

                    }).catch( ( err ) => {

                        alert('잘못된 접근입니다.')
                        this.$router.push({ name: 'home' })

                    })
           } else {

            alert('비밀번호를 한번 더 확인 부탁드립니다.')

           }
             
        },
         // 비밀번호 양식확인
        Check_Pwd_Regular() {
            const pwd = this.UserInfo.password
            const check = this.Check_Regular_Expression('password', pwd);

            if ( check ) {

                this.active_css.password = 'active_valid';
                this.Check.password = true;

            } else {

                this.active_css.password = 'active_invalid';
                this.Check.password = false;

            }

        },
        // 비밀번호 확인
        Check_Pwd_Regular2() {
            let Check = this.UserInfo.password == this.password2;

            if (Check) {
                this.active_css.password2 = 'active_valid';
                this.Check.password2 = true;
            } else {
                this.active_css.password2 = 'active_invalid';
                this.Check.password2 = false;

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
         /* 추가된 부분 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 요소들을 정렬 */
    justify-content: center; /* 주 축(center)에서 요소들을 정렬 */
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


    .upt_password_btn{
        width: 200px;
    margin: 0 auto;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px black;
    height: 33px;
    background: #e24ee2;
    color: white;
    font-weight: bolder;
    font-size: 16px;
    }
.active_invalid{

box-shadow: 0px 0px 4px rgb(255, 0, 0);
}

.active_valid{
     box-shadow: 0px 0px 6px rgb(57, 182, 80);
}
</style>