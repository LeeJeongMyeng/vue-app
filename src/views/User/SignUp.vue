<template>
    <div class="signUpContainer">
        <div class="signUpBox">
            <h1>Sign Up to Contigo</h1>
            <div class="signUp_Input">
            <form @submit.prevent="Check_SignUp_Form">
            <table>
                <tr>
                    <th><span></span> 성함 </th>
                    <td> <input type="text" id="SignUp_name" placeholder="홍길동" v-model="User.name" :class="active_css.name" > </td>
                </tr>
                <tr>
                    <th> 주민등록번호 </th>
                    <td> <input type="text" id="SignUp_frrn" placeholder="앞 6자리" v-model="Common.frrn" :class="active_css.frrn" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="6">
                         -
                         <input type="text" id="SignUp_brrn" placeholder="뒤 7자리" v-model="Common.brrn" maxlength="7" :class="active_css.brrn" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> </td>
                    <td> <button @click="Check_SignUp_name">중복확인</button></td>
                    </tr>
                <tr>
                    <th>이메일</th>
                    <td> <input type="text" id="SignUp_email" placeholder="Enter your Email" v-model="User.email" :class="active_css.email" ></td>
                    <td> <button @click="Check_SignUp_email">메일인증</button></td>
                </tr>
                <tr v-show="Common.Send_Email">
                    <th>인증코드</th>
                    <td> <input type="text" id="SignUp_email_code" maxlength="6" :class="active_css.email_Code" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" placeholder="Press Email auth_Code"></td>
                    <td> <button @click="Check_Email_Code">인증확인</button></td>
                </tr>
                <tr>
                    <th> 비밀번호 </th>
                    <td> <input type="password" id="SignUp_pwd" v-model="User.password" :class="active_css.password" @keyup="Check_Pwd_Regular" maxlength="20" > </td>
                </tr>
                <tr>
                    <th> 비밀번호확인 </th>
                    <td> <input type="password" id="SignUp_pwd2" v-model="User.password2" @keyup="Check_Pwd_Regular2" placeholder="비밀번호를 한번 더 입력해주세요" :class="active_css.password2" maxlength="20" > </td>
                </tr>
                
                <tr>
                    <th> 핸드폰번호  </th>
                    <td> <input type="text" id="SignUp_phonenumber" v-model="User.phoneNumber" :class="active_css.phoneNumber" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="11"> </td>
                </tr>
                <tr>
                    <th> 주소 </th>
                    <td> <input type="text" id="SignUp_address" placeholder="API교체하기"> </td>
                </tr>
                <tr >
                    <th> 가입유형  </th>
                    <td>
                        <input type="radio" name ="bnCheck" id="bnCkeckT" value="0" @change="bnCheck($event)" checked>일반유저
                       <input type="radio" name ="bnCheck" id="bnCkeckF" value="1" @change="bnCheck($event)">사업자유저 
                    </td>
                </tr>
                <tr id="SignUp_bn_tr" v-show="User.bnCheck">
                    <th> 사업자번호 </th>
                    <td> <input type="text" id="SignUp_bn" v-model="User.bnNumber" :class="active_css.bnNumber"> </td>
                </tr>
            </table>
            
           
            <button type="submit" class="SignUp_btn" @click="Check_SignUp_form">회원가입</button>
            </form>
            </div>
        </div>
        <div class="imgBox">
            <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg"
                alt="">
            <h4>콘티고와 함께하는 새로운<br> 여정의 시작을 환영합니다.</h4>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "signUp",
    data() {
        return {
            Common:{
                 Send_Email: false //이메일코드 전송 후, CodeInputBox열기
                 , SixRanNum  : ''
                 , Email_Code : ''
                 , frrn : ''
                 , brrn : ''
            },
            User: { email: '' //이메일
                    , password: '' //패스워드
                    , password2: '' //패스워드확인
                    , name: '' //이름
                    , personalNumber: '' //주민번호
                    , phoneNumber:'' //핸드폰번호
                    , addres:'' //주소
                    , bnCheck:'' //가입유형(사업자유무)
                    , bnNumber:'' 
                },

            //?
            active_css: { 
                      name:''
                    , frrn : ''
                    , brrn : ''
                    , email : ''
                    , email_Code : ''
                    , password : ''
                    , password2: ''
                    , phoneNumber : ''
                    , bnNumber : ''
                },
            // 주민등록번호 합치기용
            CheckInfo: {
                  email: false //이메일
                , password: false  //패스워드
                , password2: false  //패스워드2
                , name: false  //이름
                , personalNumber: false  //주민번호
                , phoneNumber: false  //핸드폰번호
                , addres: false  //주소
                , bnCheck: false  //가입유형(사업자유무)
                , bnNumber: false
            }
            
        }
    },
    created() {
        
    },
    methods: {
        //회원가입 취소
        cancle() {
            this.$router.push({ name: 'home' })
        },
        create() {
            if (this.result.name == '') {
                this.active.name = true
                return
            } else {
                this.active.name = false;
            }
            axios.put('/save', this.result)
                .then((res) => {
                    console.log(res)
                    this.$store.commit('setUser', res.data.result)
                    sessionStorage.setItem('setUser', this.base64(res.data.result))
                    this.$router.push({ name: 'SelectView' })
                })
                .catch((err) => console.log(err))
        },
        base64(user) {
            return window.btoa(encodeURIComponent(JSON.stringify(user)))
        },
        // name/personalNumber => duplicates in DataBase
        Check_SignUp_name(){
            let personalNumber = this.Common.frrn + '-' + this.Common.brrn;
            // name's length check
            const CheckNname = (this.User.name.length > 1 || this.User.name.length < 6);
            // personalNumber Check
            console.log(personalNumber+":"+personalNumber.length);
            const CheckRrn = this.Check_Regular_Expression('rrn', personalNumber);
            console.log("이름주민확인", CheckNname,CheckRrn);
            
            if(CheckNname && CheckRrn){
                const UserInfo = {
                    name : this.User.name,
                    personalNumber : personalNumber
                }

                //Check duplicates in DB with name,rrn value
                axios.post('/ctg/Check_SignUp_name', UserInfo)
                    .then((res) => {
                        console.log(res)
                        if (res.data.checkNum == 0) {
                            this.CheckInfo.name = true;
                            this.CheckInfo.personalNumber = true;
                            this.User.personalNumber = personalNumber;
                            $('#SignUp_name,#SignUp_frrn,#SignUp_brrn').attr('readonly',true);
                            this.active_css.name = 'active_valid';
                            this.active_css.frrn = 'active_valid';
                            this.active_css.brrn = 'active_valid';
                            alert('중복확인 되었습니다.')

                        } else {
                            alert('가입한 계정이 존재합니다.')
                            this.User.name = '';
                            this.Common.frrn = '';
                            this.Common.brrn = '';
                            $('#SignUp_name').focus();
                            this.active_css.name = 'active_invalid';
                            this.active_css.frrn = 'active_invalid';
                            this.active_css.brrn = 'active_invalid';
                            return false;
                        }
                    })
                    .catch((err) => console.log(err))
            }else{
                alert('이름(2~5자)과 주민번호를 올바르게 입력 부탁드립니다.');
                this.active_css.name = 'active_invalid';
                this.active_css.frrn = 'active_invalid';
                this.active_css.brrn = 'active_invalid';
                $('#SignUp_name').focus();
            }
        },
        //Email_Form_Check
        Check_SignUp_email(){
            
            const Check1 = (this.CheckInfo.name && this.CheckInfo.personalNumber)
            if(!Check1){
                alert('이름/주민번호 중복검사 완료 후 진행 부탁드립니다.');
                this.active_css.name = 'active_invalid';
                this.active_css.frrn = 'active_invalid';
                this.active_css.brrn = 'active_invalid';
                $('#SignUp_name').focus();
                return false;
            } 

            //정규식검사 진행
            const UserEmail = this.User.email;
            const EmailCheck = this.Check_Regular_Expression('email', UserEmail);
            if(!EmailCheck){
                alert('이메일을 올바른 형식으로 입력 부탁드립니다.')
                this.active_css.email = 'active_invalid';
                $('#SignUp_email').focus();
                return false;
            }
            
            //email => duplicates in DataBase
            axios.post('/ctg/Check_SignUp_email', { email: UserEmail })
                .then((res) => {
                    console.log(res)
                    if(res.data.checkNum == 0){

                       this.CheckInfo.email = true;
                       //alert('사용 가능한 이메일입니다.')
                        // 이메일 전송
                       this.Send_Email(UserEmail);

                    }else{
                        alert('중복된 이메일입니다. 다시 확인부탁드립니다.')
                        $('#SignUp_email').focus();
                        return false;
                    }
                })
                .catch((err) => console.log(err))
            


            
        },
        //Send auth-code through ‘EmailJS’
        Send_Email(){
            //Generate 6-character random numbers
            let SixRanNum = ""; 
            SixRanNum = ""
            for (let i = 0; i < 6; i++) {
                SixRanNum += Math.floor(Math.random() * 10)
            }
            console.log(SixRanNum);
            //for Check_Email_Code() Method, apply the value to Email_Code in data 
            this.Common.Email_Code = SixRanNum;
            //EmailJS From
            const templateParams = {
                to_name: this.User.name,
                to_email: this.User.email,
                message: SixRanNum

            }
            
            //Area responsible for sending Email
            emailjs.send('service_ee7pra4', 'template_azph6ba', templateParams)
                .then((response) => {
                    this.Common.Send_Email=true;
                    $('#SignUp_email_code').attr('required',true);
                    this.active_css.email = 'active_valid';
                    alert('입력하신 메일을 확인하시고, 인증번호를 입력부탁드립니다.');
                    $('#SignUp_email_code').focus();
                    console.log(response);
                },(error) => {
                    alert('정상적인 제출이 이루어지지 않았습니다. 다시 시도해주세요!')
                    console.log(error);
                });
                
                console.log(this.Common.Send_Email)

        },
        //Check auth_Email_Code of Send_Email Mehtod.
        Check_Email_Code(){

            const check = (this.Common.Email_Code == $('#SignUp_email_code').val());

            if(check){
               // $('#SignUp_email').attr('readonly',true);
               alert('인증확인되었습니다.')
                $('#SignUp_email_code').attr('readonly',true);
                this.active_css.email_Code = 'active_valid';
                this.User.email = true;
            }
            

        },
        // password's Validation
        Check_Pwd_Regular(){
            const pwd = this.User.password
            const check = this.Check_Regular_Expression('password', pwd);

            if (check) {
                this.active_css.password = 'active_valid';
                this.CheckInfo.password = true;
            } else {
                this.active_css.password = 'active_invalid';
                this.CheckInfo.password = false;
            }

        },
        // password2's Validation
        Check_Pwd_Regular2(){
            let Check = this.User.password == this.User.password2;

            if(Check){
                this.active_css.password2 = 'active_valid';
                this.CheckInfo.password2 = true;
            }else{
                this.active_css.password2 = 'active_invalid';
                this.CheckInfo.password2 = false;
            }

        },









        //Method executed when selecting a 'input[type=radio]'
        bnCheck(event) {
            if (event.target.value == 0) {
                this.User.bnCheck = false;
                this.User.bnNumber = '';
                $('#SignUp_bn').attr("required", false);
            } else {
                this.User.bnCheck = true;
                $('#SignUp_bn').attr("required", true);
            }

            this.User.bnCheck = event.target.value == 0 ? false : true;
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
            } else if (key == 'password'){
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
            }

            return result;

        },
        //When clicked 'SignUp Complete'.
        Check_SignUp_form(){
            const ChekcInfo = this.CheckInfo;
            const CheckInfo2 = Object.values(ChekcInfo);
            CheckInfo2.forEach((value,index,array) => {
                console.log(value);
            })
           
            
        }
        
        

        
    }
}
</script>

<style scoped>
/*signIn컨테이너 전체 */
.signUpContainer {
    display: flex;
    margin-top: -7px;
    min-width: 1900px;
}

/* ============================================================================================================================================== */
/* 왼쪽 로그인 박스 */
.signUpContainer .signUpBox {
    position: relative;
    width: 110%;
    height: 80vh;
    /* 수정필요 */
    padding: 20px;
    text-align: center;
}

.signUpContainer .signUpBox h1 {
    text-align: center;
    margin-top: 30px;
    font-size: 28px;
    font-weight: bold;

}

.signUpContainer .signUpBox table tr th{
    font-weight: bold;
    text-align: right;
    width: 14%;
    font-size: 12px;
}
.signUpContainer .signUpBox table tr>td:nth-child(2){
    width:59%;
}
.signUpContainer .signUpBox table tr>td:nth-child(3){
    width: 30%;
}

.signUpContainer .signUpBox .signUp_Input {
    position: absolute;
    top: 13%;
    left: 19%;
    padding: 26px;
    border-radius: 9px;
    border: 1px solid rgb(173, 173, 173);
    /* background: rgb(247, 241, 247,0.5); */
    width: 56%;
    box-shadow: 0px 0px 7px gray;
}

.signUpContainer .signUpBox .signUp_Input input[type=radio]{
    width: 22px;
    margin: 9px;
    vertical-align: middle;

}



.signUpContainer .signUpBox input {
    width: 292px;
    height: 29px;
    border-radius: 5px;
    border: 1px solid rgb(173, 173, 173);
    margin: 10px auto;
}
.signUpContainer .signUpBox #SignUp_frrn,#SignUp_brrn {
    width: 120px;
    height: 29px;
    border-radius: 5px;
    border: 1px solid rgb(173, 173, 173);
    margin: 5px 15px;
}




.signUpContainer .SignUp_btn {
    position: absolute;
    top: 132%;
    left: 7%;
    /* border-radius: 5px; */
    font-size: 20px;
    font-weight: bold;
    width: 466px;
    height: 60px;
    margin-left: 28px;
    /* border: 1px solid rgb(173, 173, 173); */
    /* background: none; */
    /* ----- */
    border : 0;
    border-radius: 20px;
    background: rgb(130 61 170);
    color: white;
    box-shadow: 2px -1px 7px rgb(212, 177, 177);
    /* text-shadow: 1px 1px 1px gray; */
}



/* ============================================================================================================================================== */
/* 오른쪽 이미지박스 */
.signUpContainer .imgBox {
    width: 90%;
    position: relative;
}

.signUpContainer .imgBox img {
    width: 100%;
}

.signUpContainer .imgBox h4 {
    position: absolute;
    top: 45%;
    left: 34%;
    color: white;
    font-size: 25px;
    font-weight: bold;
    line-height: 200%;
    
}

/* ===================================================================================== */
/* 유효성 검사용 스타일 */
.active_invalid{
    
    box-shadow: 0px 0px 3px rgb(255, 0, 0);
}

.active_valid{
     box-shadow: 0px 0px 3px rgb(57, 182, 80);
}
</style>