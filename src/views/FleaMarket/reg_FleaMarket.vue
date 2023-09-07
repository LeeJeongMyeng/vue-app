<template>
<div>
    <div style="text-align: center; height: 61px; margin: 36px 0;"><h1 style="font-size: 29px; font-weight: bold;">플리마켓 작성글 등록</h1></div>
  <div class="container">
    
     <table>
            <tr>
                 
                 <td> <input type="hidden"  v-model="FleaMarket.userno" id="userno" >
                        <input type="hidden" v-model="FleaMarket.email" id="email" >
                 </td>
            </tr>
            <tr>
             <th>글제목 </th>
                 <td colspan="2"> <input type="text" v-model="FleaMarket.title" id="title" placeholder="홍길동"  autocomplete=”off”> </td>
            </tr>
            <tr>
                <th> 신청마감일자 </th>
                <td> <date-picker
                        v-if="dateType === 'day'"
                        v-model="FleaMarket.endDate"
                        format="YYYY-MM-DD"
                        :lang="lang"
                        type="date" 
                        placeholder="날짜선택" 
                        id="Datepicker" 
                        style=" width: 50%;
                                height: 15px;
                                border-radius: 5px;
                                padding: 6px;
                                border: none;
                                box-shadow: 0 0 3px;"
                    ></date-picker>
                    </td>
                    <td style="font-size: 17px; font-weight: bolder;">모집규모<input type="text" v-model="FleaMarket.approvalCnt" style="margin: 0 0 0 14px; width: 122px;"></td>
            </tr>
            <tr class="addressbox">
                        <th> 주소 </th>
                        <td> 
                        <div style="display: flex;">
                        <input type="hidden" id="sample6_postcode" placeholder="우편번호" readonly>
                        <input type="button" id="sample6_btn" @click="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
                        </div> 
                        <input type="text" id="sample6_address" placeholder="주소" readonly><br>
                        <input type="hidden" id="sample6_detailAddress" placeholder="상세주소">
                        <input type="hidden" id="sample6_extraAddress" placeholder="참고항목" readonly>
                        </td>
                    </tr>
            <tr style=" margin-top:5px;">
                <th colspan='3' style="padding: 31px; font-size: 30px;">모집요강</th>
            </tr>
            <tr>
               <td colspan='3'>
                <ckeditor id="ckeditor" v-model="FleaMarket.content" :config="editorConfig"></ckeditor> 
                <button @click="check">확인</button>
                
                </td>
            </tr>
            <tr>
               <td style="padding: 10px">
                <input id="customFile" type="file" ref="files" @change="readInputFile" multiple accept="image/*"/>
               </td>
            </tr>
            <tr>
                <td colspan='3'>
                    <div id="imagePreview">
                        <span style="font-size: 17px;">이미지 미리보기</span>
                    </div>
                </td>
            </tr>
    </table>
    <!-- <div style="display: flex;"><button type="button" id="regFMbtn" @click="reg_FleaMarket"> 게시글 등록 </button></div> -->
    <div style="display: flex;"><button type="button" id="regFMbtn" @click="check"> 게시글 등록 </button></div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store';
import Datepicker from "vue3-datepicker";
import { ref } from 'vue'


export default  {
    
    name:'reg_FleaMarket',
    components:{
         'date-picker':Datepicker
    },
    computed:{
       member() {
            return this.$store.state.member
        }
    },
    created(){
        this.FleaMarket.userno = this.member.userno;
        this.FleaMarket.email = this.member.email;
    },
    
    data() {
        return {
            common:{
                uploadimageurl: [],    // 업로드한 이미지의 미리보기 기능을 위해 url 저장하는 객체
                imagecnt: 0,
                imagelist: [],        // 불러온 이미지들의 url을 저장하는 객체
                imagecnt: 0,
                 
            },
            //CKEditer
            editorConfig: {
                // The configuration of the editor.
            },
            //데이터 전송용
            FleaMarket:{
                userno: '', //작성자 회원번호
                email:'',
                title: '', // 제목
                endDate: '', //게시글 종료날짜
                address:'',
                FormData:'', //파일
                approvalCnt:'', //모집인원수
                content: `<div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">개요<br />
                                        &nbsp;</div>

                                        <p>​</p>

                                        <p>&nbsp;</p>

                                        <p>기본설명글작성해주세요</p>

                                        <p>&nbsp;</p>

                                        <p>&nbsp;</p>

                                        <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>

                                        <p><br />
                                        ﻿✅[마켓&middot;행사&middot;샵인샵]명칭 (ex.마켓명)</p>

                                        <p>👉&nbsp;</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿﻿✅마켓의 주제</p>

                                        <p>👉&nbsp;</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅주최 및 주관사 정보 (사업자명,사업자번호 필수기재)</p>

                                        <p>👉 사업자명 :&nbsp;</p>

                                        <p>👉 사업자번호 :&nbsp;</p>

                                        <p>👉 추가기입사항:</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅개최장소 혹은 입점장소</p>

                                        <p>👉&nbsp;</p>

                                        <p><br />
                                        ﻿✅개최일정 혹은 입점일정</p>

                                        <p>👉&nbsp;</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅모집기간</p>

                                        <p>﻿👉 0000년 0월 00일 ~ 0월 00일 매주 금/토/일</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅모집규모 (ex)모집셀러수,행사장규모,입점매장 규모)</p>

                                        <p>﻿👉 전체참여셀러(팀)수 ( 80팀 )</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅모집조건</p>

                                        <p>﻿👉 예시) 핸드메이드, 수공예 품등</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅참가(입점)비용</p>

                                        <p>﻿👉 .</p>

                                        <p>​</p>

                                        <p>﻿✅보관비용</p>

                                        <p>👉</p>

                                        <p>​</p>

                                        <p>✅환불기준</p>

                                        <p>👉 행사전 우천시 100% 반환 외 환불 불가</p>

                                        <p>👉 행사 간 50%이상 진행이 된 경우 참가비용은 반환 되지 않음</p>

                                        <p>👉 행사일 2일전 참가비 환불불가</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅유동인구수</p>

                                        <p>﻿👉&nbsp;</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>﻿✅주차지원여부</p>

                                        <p>👉</p>

                                        <p>​</p>

                                        <p>&nbsp;</p>

                                        <p>​</p>

                                        <p>​</p>

                                        <p>✅현장지원안내(ex)행사지원인원,테이블,헹거 집기류등)</p>

                                        <p>👉 행사 운영인력 :&nbsp;</p>

                                        <p>👉 행사 지원품목 :&nbsp;</p>

                                        <p>&nbsp;</p>

                                        <p>&nbsp;</p>

                                        <p>﻿</p>

                                        <p>👉 신청 전 유의사항을 확인해주세요.</p>

                                        <p>미확인 후 사고 발생 시 책임은 본인에게 부담됩니다.</p>

                                        <p>또한 신청시 개인정보 수집 및 이용 동의한 것으로 간주됩니다.</p>

                                        <p>(핸드폰번호, 신청자명 / 이용 목적 : 본인 식별 및 신청 내용 통보 / 유효기간 : 행사 종료 후)</p>`,
                
            },
            
            monthDate: null,
            lang: {
                days: ["일", "월", "화", "수", "목", "금", "토"],
                months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                yearFormat: "YYYY년",
                monthFormat: "MM월",
                monthBeforeYear: false,
            },
            dateType: "day", // 일간: day, 주간: week, 월간: month
        }
    },
    setup() {
    },
    mounted(){
      
    },
    
    methods:{
        //주소
        //주소API
        sample6_execDaumPostcode() {

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
        //파일 미리보기 처리 -> inputFiles()로가서 파일데이터 담아줌
        readInputFile(e){
            
            $('#imagePreview').empty();

            var files = e.target.files;
            var fileArr = Array.prototype.slice.call(files);
            console.log(fileArr);
            fileArr.forEach(function (f) {
                if (!f.type.match("image/.*")) {
                    alert("이미지 확장자만 업로드 가능합니다.");
                    return;
                };
                var reader = new FileReader();
                reader.onload = function (e) {
                    var html = `<img  src=${e.target.result} style='width:15%; margin: 0 18px;' />`;
                    $('#imagePreview').append(html);
                };
                reader.readAsDataURL(f);
            })
            this.inputFiles();
        },
        //data에 파일 담아줌
        inputFiles() {
            this.FleaMarket.FormData = this.$refs.files.files

            console.log(this.FleaMarket.FormData)
        },
        check(){
        

            this.FleaMarket.address = $('#sample6_address').val();
            console.log('dadsadasd',typeof($('#Datepicker').val()));
            //this.FleaMarket.endDate = $('#Datepicker').val();
            
           console.log(this.FleaMarket.userno)
           console.log(this.FleaMarket.email)
           console.log(this.FleaMarket.title)
           console.log(this.FleaMarket.endDate)
           console.log(this.FleaMarket.address)
           console.log(this.FleaMarket.FormData)
           console.log(this.FleaMarket.approvalCnt)
           console.log(this.FleaMarket.content)
           
        }
        
       
    }
}

</script>

<style scoped>
    
    .container{
        /* background: red; */
        width: 57%;
        margin: 0 auto;
        height: 125vh;
        box-shadow: 0 0 7px gray;
        }
    table {
     position: relative;
    top: 43%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 32px;
    width: 100%;
    /* height: 30%; */
    /* background: rgb(189, 179, 179); */
    margin: 0 0 67px 0;
}
    
       
    table tr th{
        font-size: 17px;
        font-weight: bolder;
        /* border : 1px solid gray; */
        height: 54px;
        width: 20%;
    }
   

    table tr input[type=text]{
        width: 95%;
        height: 15px;
        border-radius: 5px;
        padding: 6px;
        border: none;
        box-shadow: 0 0 3px;
    }
    
    table tr input[id=email]{
        width: 22%;
        
    }

    table tr #stDate,#endDate{
        width: 23%;
    }
    ckeditor{
        width: 80%;
    }

  .cke_contents{ height: 400px; }

    #Datepicker{
            width: 50%;
    height: 15px;
    border-radius: 5px;
    padding: 6px;
    border: none;
    box-shadow: 0 0 3px;
    }

    #imagePreview{
     width: 97%;
    /* background: red; */
    max-height: 500px;
    height: 221px;
    padding: 17px;
    box-shadow: 0 0 5px gray;
    }

    #imagePreview img{
        width: 10%;
        
    }

   #regFMbtn{
    margin: 0 auto;
    width: 30%;
    height: 45px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 4px purple;
    background: #bc44bc;
    font-size: 18px;
    font-weight: bold;
    color: white;
   }
    




</style>