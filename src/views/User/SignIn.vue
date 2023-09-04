<template>
    <div class="signInContainer">
        <div class="signInBox">
            <h1>Sign in to Contigo</h1>
            
            <div class="signIn_Input">
                <ul id="signIn_Email_tag">
                    <li>Email</li>
                    <li>아이디 찾기</li>
                </ul>
                <input type="text" id="SignIn_id" placeholder="Enter your Email"><br>
                <ul id="signIn_Pwd_tag">
                    <li>password</li>
                     <li>비밀번호찾기</li>
                </ul>
                <input type="password" id="SignIn_pwd"><br>
                <button type="button" class="SignIn_btn">로그인</button>
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
export default {
    name : "signIn",
    data() {
        return {

        }
    },
    created(){

    },
    methods: {
        Go_To_SignUp(){
             this.$router.push({ name: 'signUp' })
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