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
                <input type="password" id="SignIn_pwd" v-model="User.password" autocomplete="off"><br>
                <button type="button" class="SignIn_btn" @click="SignIn">로그인</button>
            </div>
            <button type="button" class="SignUp_btn" @click="Go_To_SignUp">회원가입</button>
        </div>
        <div class="imgBox">
           <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg" alt="">
           <h4>콘티고와 함께하는 새로운<br> 여정의 시작을 환영합니다.</h4>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import store from '@/store';
export default {
    name : "signIn",
    data() {
        return {
            User:{
                email : '' ,
                password : ''
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
            console.log(Check)
            if(Check){
             axios.post('/ctg/SignIn_Ctg_Member', this.User)
                .then((res) => {
                    console.log(res.data)

                    //store.js의 mutations로 받은 데이터를 할당해줌
                    store.commit('setAccount',res.data);
                    sessionStorage.setItem("member",res.data);
                    
                    window.alert('로그인되었습니다.');
                    this.$router.push({ name: 'home' })

                })
                .catch((err) => 
                    window.alert('로그인 정보가 존재하지않습니다.')
                )
            }else{
                alert('올바른 이메일 양식 입력 부탁드립니다.')
            }
        },
        //정규식검사 메서드
        Check_Regular_Expression(key, value) {
            let Regular_Expression = '';
            let result = false;
            if (key == 'email') {
                Regular_Expression = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[.0-9a-zA-Z])*.[a-zA-Z]$/i;
                result = (Regular_Expression.test(value) && value != '');
            } 
            // else if (key == 'rrn') {
            //     Regular_Expression = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
            //     result = (value.length == 14 && (Regular_Expression.test(value)));
            //     console.log(value.length + ':' + Regular_Expression.test(value));
            // } else if (key == 'password') {
            //     const pw = value;
            //     const num = pw.search(/[0-9]/g); //숫자확인
            //     const eng = pw.search(/[a-z]/ig); //영어확인
            //     const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩';:₩/?]/gi); //특수문자확인
            //     if (pw.length < 8 || pw.length > 16) { //비밀번호 길이확인
            //         result = false;
            //     } else if (pw.search(/\s/) != -1) { //공백확인
            //         result = false;
            //     } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) { //두가지 조합 혼합 확인
            //         result = false;
            //     } else {
            //         result = true;
            //     }
            // } else if ('PhoneNumber') {
            //     Regular_Expression = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
            //     result = ((value.length == 11 || value.length == 10) && (Regular_Expression.test(value)));
            // }

            return result;

        }
    }
}
</script>

<style scoped>
/*signIn컨테이너 전체 */
    .signInContainer{
        display: flex;
        margin-top: -7px;
        min-width:2000px;
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
</style>