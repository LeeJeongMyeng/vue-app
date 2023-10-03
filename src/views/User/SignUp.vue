<template>
    <div class="signUpContainer">
        <div class="signUpBox">
            <h1>Sign Up to Contigo</h1>
            <div class="signUp_Input">
            <form @submit.prevent="Check_SignUp_Form">
            <table>
                <tr>
                    <th><span></span> 성함 </th>
                    <td> <input type="text" id="SignUp_name" placeholder="홍길동" v-model="User.name" :class="active_css.name" maxlength="5" autocomplete=”off”> </td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td> <input type="text" id="SignUp_email" placeholder="Enter your Email" v-model="User.email" :class="active_css.email" ></td>
                    <td> <button @click="Check_SignUp_email">메일인증</button></td>
                </tr>
                <tr v-show="Common.Send_Email">
                    <th>인증코드</th>
                    <td> <input type="text" id="SignUp_email_code" maxlength="6" :class="active_css.email_Code" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" placeholder="Press Email auth_Code"></td>
                    <td> <button @click="Check_Email_Code">인증확인</button> | <button @click="reset_Email">다시입력</button></td>
                </tr>
                <tr>
                    <th> 비밀번호 </th>
                    <td style="text-align: left; padding-left: 26px;">
                        <span>*8~16자 영어/특수문자/숫자 중 2가지 이상조합*</span> 
                        <input type="password" id="SignUp_pwd" v-model="User.password" :class="active_css.password" @keyup="Check_Pwd_Regular" maxlength="20" autocomplete=”off” placeholder="비밀번호 입력"> 
                    </td>
                </tr>
                <tr>
                    <th> 비밀번호확인 </th>
                    <td>
                        
                        <input type="password" id="SignUp_pwd2" v-model="User.password2" @keyup="Check_Pwd_Regular2" placeholder="비밀번호를 한번 더 입력해주세요" :class="active_css.password2" maxlength="20" autocomplete=”off” >
                    </td>
                </tr>
                
                <tr>
                    <th> 핸드폰번호  </th>
                    <td  style="text-align: left; padding-left: 26px;">
                        <span>*- 제외 11자*</span>
                        <input type="text" id="SignUp_phonenumber" v-model="User.phone_number" :class="active_css.phoneNumber" @keyup="Check_PN_Regular" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" minlength="10" maxlength="11" placeholder="01012345678">
                    </td>
                </tr>
                <tr class="addressbox">
                    <th> 주소 </th>
                    <td> 
                    <div style="display: flex;">
                    <input type="text" id="sample6_postcode" placeholder="우편번호" readonly>
                    <input type="button" id="sample6_btn" @click="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
                    </div> 
                    <input type="text" id="sample6_address" placeholder="주소" readonly><br>
                    <input type="text" id="sample6_detailAddress" placeholder="상세주소">
                    <input type="text" id="sample6_extraAddress" placeholder="참고항목" readonly>
                    </td>
                </tr>
                <tr >
                    <th> 가입유형  </th>
                    <td>
                        <input type="radio" name ="is_business" id="bnCkeckT" value="0"  @change="is_business($event)" checked>일반회원
                       <input type="radio" name ="is_business" id="bnCkeckF" value="1"  @change="is_business($event)">사업자회원
                    </td>
                </tr>
                <tr id="SignUp_bn_tr" v-show="Common.open_bnNumber">
                    <th> 사업자번호 </th>
                    <td> <input type="text" id="SignUp_bn" v-model="User.business_number" :class="active_css.bnNumber" autocomplete=”off”> </td>
                    <td> <button @click="Check_Business_Number">사업자번호확인</button></td>
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
                 , open_bnNumber : false
            },
            User: { email: '' //이메일
                    , password: '' //패스워드
                    , password2: '' //패스워드확인
                    , name: '' //이름
                    , phone_number : '' //핸드폰번호
                    , postal_code : '' //우편번호
                    , address : '' //주소
                    , extra_address : '' // 부가주소
                    , detail_address : '' // 상세주소
                    , is_business : false //가입유형(사업자유무)
                    , business_number : ''
                    , userno : 'N'
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
                , phone_number: false  //핸드폰번호
                , address: false  //주소
                , is_business: true  //가입유형(사업자유무)
                //, bnNumber: false
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
        
        //이메일 양식확인-> 중복-> 이메일보내기
        Check_SignUp_email(){
            

            //정규식검사 진행
            const UserEmail = this.User.email;
            const EmailCheck = this.Check_Regular_Expression('email', UserEmail);
            if(!EmailCheck){
                alert('이메일을 올바른 형식으로 입력 부탁드립니다.')
                this.active_css.email = 'active_invalid';
                $('#SignUp_email').focus();
                return false;
            }
            
          //  이메일 중복검사
            axios.post('/ctg/Check_SignUp_email', { email: UserEmail })
                .then((res) => {
                    console.log(res)
                    if(res.data.checkNum == 0){

                       
                       //alert('사용 가능한 이메일입니다.')
                        // 이메일 전송
                       this.Send_Email(UserEmail);
                        $('#SignUp_email').attr('readonly',true);

                    }else{
                        alert('중복된 이메일입니다. 다시 확인부탁드립니다.')
                        $('#SignUp_email').focus();
                        return false;
                    }
                })
                .catch((err) => console.log(err))
            


            
        },
        //이메일 보낼준비
        Send_Email(){
            //6자 난수생성
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
            
            //이메일 보내기
            emailjs.send('service_ee7pra4', 'template_azph6ba', templateParams)
                .then((response) => {
                    this.Common.Send_Email=true;
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
        //이메일 코드 확인
        Check_Email_Code(){

            const check = (this.Common.Email_Code == $('#SignUp_email_code').val());

            if(check){
               // $('#SignUp_email').attr('readonly',true);
               alert('인증확인되었습니다.')
                $('#SignUp_email_code').attr('readonly',true);
                this.active_css.email_Code = 'active_valid';
                this.CheckInfo.email = true;
            }else{
                alert('인증번호가 일치하지않습니다. 다시확인 부탁드립니다.')
                this.active_css.email_Code = 'active_invalid';
            }
            

        },
        //이메일 및 인증코드 리셋
        reset_Email(){
            $('#SignUp_email').val('').attr('readonly', false);
            $('#SignUp_email_code').val('').attr('readonly', false);
            this.CheckInfo.email = false;
            $('#SignUp_email').focus();
            this.active_css.email_Code = 'active_invalid';
            this.active_css.email = 'active_invalid';
        },
        // 비밀번호 양식확인
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
        // 비밀번호 확인
        Check_Pwd_Regular2(){
            let Check = this.User.password == this.User.password2;

            if(Check){
                this.active_css.password2 = 'active_valid';
                this.CheckInfo.password2 = true;
                console.log('1차:'+this.CheckInfo.password + ': 2차:' + this.CheckInfo.password2);
            }else{
                this.active_css.password2 = 'active_invalid';
                this.CheckInfo.password2 = false;
                console.log('1차:' + this.CheckInfo.password + ': 2차:' + this.CheckInfo.password2);

            }

        },
        //핸드폰번호
        Check_PN_Regular(){
            const phone_number = this.User.phone_number;
            const Check = this.Check_Regular_Expression('PhoneNumber', phone_number);

            if(Check){
                this.active_css.phoneNumber = 'active_valid';
                this.CheckInfo.phone_number = true
            }else{
                this.active_css.phoneNumber = 'active_invalid';
                 this.CheckInfo.phone_number = false
            }
        },
        //주소API
        sample6_execDaumPostcode(){
            
                 new daum.Postcode({
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = ''; // 참고항목 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                        // 조합된 참고항목을 해당 필드에 넣는다.
                        document.getElementById("sample6_extraAddress").value = extraAddr;

                    } else {
                        document.getElementById("sample6_extraAddress").value = '';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                }
            }).open();
                    
            
            

        },
        //주소 입력했는지 확인
        Check_address(){
            return this.CheckInfo.address = $('#sample6_postcode').val() != '';
        },
        //주소API 실행 이후, VUE DATA에 할당
        Success_Address(){
            this.CheckInfo.address = true;
            this.User.postal_code = $('#sample6_postcode').val();
            this.User.address = $('#sample6_address').val();
            this.User.extra_address = $('#sample6_extraAddress').val();
            this.User.detail_address = $('#sample6_detailAddress').val();
        },



        //가입유형 선택 처리(css 및 date할당)
        is_business(event) {
            if (event.target.value == 0) {
                //회원가입시 확인할 사업자부분 check
                this.CheckInfo.is_business = true;
                // 회원가입시 DB에 들어갈 Boolean데이터입력
                this.User.is_business = false;
                // 일반,사업자 radio선택 시, 사업자번호 확인하는칸 활성화 담당
                this.Common.open_bnNumber = false;
                this.User.business_number = '';
                $('#SignUp_bn').attr("required", false);
                this.User.user_id = 'N';
            } else {
                this.CheckInfo.is_business = false;
                this.User.business_number = '';
                this.Common.open_bnNumber = true;
                this.User.user_id = 'B';
                $('#SignUp_bn').attr("required", true);
            }

        },
        //사업자번호 확인 API
        Check_Business_Number(){
            const business_number = this.User.business_number.replaceAll('-', '');
            console.log(business_number)
            var data = { "b_no":  [business_number] };
            console.log(data.business_number);
            axios.post("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=qaJs1GHTyoLGcztYwOmuuQrV8qrgsos8R3r%2FpIQdyqX2HWAX%2Fy8tlU33sKXL0L0XkV%2FBAGqk8BT8KMVPoZn25g%3D%3D", data)
                .then((result) => {
                    console.log(result.data.data[0].b_stt);
                    const b_stt = result.data.data[0].b_stt;
                    if(b_stt == '계속사업자'){
                       console.log('완료');
                        this.BN_Check(business_number);
                        
                    }else{
                        alert('없는 사업자 번호입니다. 다시한번 확인 부탁드립니다.')
                    }
                })
                .catch((err) => console.log(err))
            
        },
        //중복 검사
        BN_Check(business_number){
            var data = { "business_number": business_number };
            axios.post("/ctg/BN_Check", data)
                .then((res) => {
                    console.log(res);
                if(res.data==0){
                        this.CheckInfo.is_business = true;
                        this.User.is_business = true;
                        this.User.business_number = business_number;
                        $('#SignUp_bn').attr('readonly', true);
                        
                        alert('사업자 번호 확인되었습니다.')
                }else{
                        $('#SignUp_bn').val('');
                        $('#SignUp_bn').focus();
                        alert('중복된 사업자 번호입니다. 다시 입력 부탁드립니다.');
                }
            })
            .catch((err) => console.log(err))
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
            } else if('PhoneNumber'){
                Regular_Expression = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
                result = ((value.length == 11 || value.length ==10) && (Regular_Expression.test(value)));
            }

            return result;

        },
        //가입완료 클릭시 진행
        Check_SignUp_form(){
            
            
            //주소api는 건들수가 없기에 여기서 유효성확인
            //주소할당 => 주소api사용했을 때 vue data에 적용이 안되더라,,,
            if(this.Check_address()) this.Success_Address();

            //유효성검사 전부 완료가 되었는지 확인
             const ChekcInfo = this.CheckInfo;
             //data배열의 이름들
            const CheckInfo2_key = Object.keys(this.CheckInfo);

            const UserInf = this.User;
            const UserInf_kyes = Object.keys(this.CheckInfo);

            //데이터베이스에 입력될 데이터들 확인
            UserInf_kyes.forEach(key => {
                console.log('User',key, ':', UserInf[key]);
            })

            // 유효성검사 => data.CheckInfo boolean전체 확인
            let totCheck = true;
            for(var i = 0; i< CheckInfo2_key.length; i++){
                console.log('CheckInfo', CheckInfo2_key[i], ':', ChekcInfo[CheckInfo2_key[i]]);
                if(ChekcInfo[CheckInfo2_key[i]] ==false) {
                    totCheck = false;
                    
                };
            }

            //위 검사에서 false가 나올경우 취소
            if(!totCheck) {
                alert('입력 칸을 모두 채워주세요.')
                return false;
            }
            // 여기까지 올경우 insert진행
            this.User.detail_address = this.sanitizeInput(this.User.detail_address);
            axios.post('/ctg/Ins_Ctg_Member', this.User)
                .then((res) => {
                    console.log(res)

                    alert('회원가입이 완료 되었습니다. 로그인 페이지로 이동합니다.')
                    this.$router.push({ name: 'SignIn' });

                })
                .catch((err) => console.log(err))
        },
         sanitizeInput(value) {
            value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
            value = value.replaceAll("'", "&#39;");
            value = value.replace(/eval\((.*)\)/g, "");
            value = value.replace(/["'][\s]*javascript:(.*)["']/g, "\"\"");
            value = value.replace(/script/g, "");
            return value;
        },
        processHTML(html) {
            const escapedHTML = html
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/\\\(/g, '&#40;')
                .replace(/\\\)/g, '&#41;')
                .replace(/'/g, '&#39;');
            return escapedHTML;
        },

        
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
.signUpContainer .signUpBox .signUp_Input table tr td span{
    font-size: 10px;
    color: red;
    font-weight: bolder;
}

.signUpContainer .signUpBox .signUp_Input {
    position: absolute;
    top: 17%;
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
    top: 105%;
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

.signUp_Input .addressbox  #sample6_postcode{
    width:100px;
    margin: 14px 10px 0px 24px;
}

.signUp_Input .addressbox #sample6_btn{
    width:100px;
    margin: 17px 0 0 0;
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
    
    box-shadow: 0px 0px 4px rgb(255, 0, 0);
}

.active_valid{
     box-shadow: 0px 0px 6px rgb(57, 182, 80);
}
</style>