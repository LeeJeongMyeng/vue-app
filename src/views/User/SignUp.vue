<template>
    <div class="signUpContainer">
        <div class="signUpBox">
            <h1>Sign Up to Contigo</h1>
            <div class="signUp_Input">
            <form @submit.prevent="Check_SignUp_Form">
            <table>
                <tr>
                    <th>아이디</th>
                    <td> <input type="text" id="SignUp_id" placeholder="Enter your Email" v-model="User.email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></td>
                    <td> <button @click="Check_SignUp_email"></button></td>
                </tr>
                <tr>
                    <th> 비밀번호 </th>
                    <td> <input type="password" id="SignUp_pwd" v-model="User.password" required> </td>
                </tr>
                <tr>
                    <th> 비밀번호확인 </th>
                    <td> <input type="password" id="SignUp_pwd2" placeholder="비밀번호를 한번 더 입력해주세요" required> </td>
                </tr>
                <tr>
                    <th> 성함 </th>
                    <td> <input type="text" id="SignUp_name" placeholder="홍길동" v-model="User.name" required> </td>
                </tr>
                <tr>
                    <th> 주민등록번호 </th>
                    <td> <input type="text" id="SignUp_frrn" placeholder="앞 6자리" v-model="rrn.SignUp_frrn" required>
                         -
                         <input type="text" id="SignUp_brrn" placeholder="뒤 7자리" v-model="rrn.SignUp_brrn" required> </td>
                </tr>
                <tr>
                    <th> 핸드폰번호  </th>
                    <td> <input type="text" id="SignUp_phonenumber" v-model="User.phoneNumber" required> </td>
                </tr>
                <tr>
                    <th> 주소 </th>
                    <td> <input type="text" id="SignUp_address" placeholder="API교체하기"> </td>
                </tr>
                <tr >
                    <th> 가입유형  </th>
                    <td>
                        <input type="radio" name ="bnCheck" id="bnCkeckT" value="0" @change="bnCheck($event)" >일반유저
                       <input type="radio" name ="bnCheck" id="bnCkeckF" value="1" @change="bnCheck($event)">사업자유저 
                    </td>
                </tr>
                <tr id="SignUp_bn_tr" v-show="User.bnCheck">
                    <th> 사업자번호 </th>
                    <td> <input type="text" id="SignUp_bn" v-model="User.bnNumber"> </td>
                </tr>
            </table>
            
           
            <button type="submit" class="SignUp_btn">회원가입</button>
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
            User: { email: '' //이메일
                    , password: '' //패스워드
                    , name: '' //이름
                    , personalNumber: '' //주민번호
                    , phoneNumber:'' //핸드폰번호
                    , addres:'' //주소
                    , bnCheck:'' //가입유형(사업자유무)
                    , bnNumber:'' 
                },

            //?
            active: { name: false, email: false, pwd: false },
            // 주민등록번호 합치기용
            rrn:{ 
                SignUp_frrn : '', SignUp_brrn : ''
            },
            
        }
    },
    created() {
        
    },
    methods: {
        //회원가입 취소
        cancle() {
            this.$router.push({ name: '' })
        },
        create() {
            // console.log(this.result)

            if (this.result.name == '') {
                this.active.name = true
                return
            } else {
                this.active.name = false;
            }
            

            //console.log(this.result.name)

            //console.log(this.result)

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
        //가입유형 선택시 메서드
        bnCheck(event){
            if(event.target.value == 0){
                this.User.bnCheck = false;
                this.User.bnNumber = '';
                $('#SignUp_bn').attr("required", false);
            }else{
                this.User.bnCheck = true;
                $('#SignUp_bn').attr("required", true);
            }

            this.User.bnCheck =  event.target.value==0?false:true;
        },
        //email양식 체크
        Check_SignUp_email(){
            var email = this.User.email;
            const RegEmail = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[.0-9a-zA-Z])*.[a-zA-Z]$/i;
            if(!RegEmail.test(email) || email ==''){
                alert('이메일을 올바른 형식으로 입력 부탁드립니다.')
                $('#SignUp_id').focus();
                return false;
            }

            axios.post('/ctg/Check_SignUp_email', email)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => console.log(err))
            


            alert('이메일 보내기 기능 준비중')
        },
        //회원가입 완료 눌렀을 때, 유효성 검사 메서드 
        Check_SignUp_form(){
            
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
    width: 20%;
}
.signUpContainer .signUpBox table tr td{
    width:80%
}

.signUpContainer .signUpBox .signUp_Input {
    position: absolute;
    top: 13%;
    left: 19%;
    padding: 26px;
    border-radius: 9px;
    border: 1px solid rgb(173, 173, 173);
    background: rgb(247, 241, 247,0.5);
    width: 577px;
}

.signUpContainer .signUpBox .signUp_Input input[type=radio]{
    width: 22px;
    margin: 9px;
    vertical-align: middle;

}



.signUpContainer .signUpBox input {
    width: 400px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid rgb(173, 173, 173);
    margin: 10px auto;
}
.signUpContainer .signUpBox #SignUp_frrn,#SignUp_brrn {
    width: 177px;
    height: 35px;
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


/* 유효성 검사용 스타일 */
.active{
    border: 1px solid rgb(255, 0, 0);
    box-shadow: 2px -1px 7px rgb(255, 0, 0);
}
</style>