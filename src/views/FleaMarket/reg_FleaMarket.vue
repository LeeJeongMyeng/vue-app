<template>
<div>
  <div class="container">
    <h1>플리마켓 작성글 등록</h1>
     <table>
            <tr>
             <th> 작성자 </th>
                 <td> <input type="text" id="email" placeholder="홍길동"  autocomplete=”off”> </td>
            </tr>
            <tr>
             <th>글제목 </th>
                 <td> <input type="text" id="title" placeholder="홍길동"  autocomplete=”off”> </td>
            </tr>
            <tr>
                <th> 진행기간 </th>
                <td> <input type="text" id="stDate" placeholder="">
                     -
                    <input type="text" id="endDate" placeholder="" > </td>
            </tr>
           <tr class="addressbox">
                        <th> 진행장소 </th>
                        <td> 
                        <div style="display: flex;">
                        <input type="hidden" id="sample6_postcode" placeholder="우편번호" readonly>
                        <input type="button" id="sample6_btn" @click="sample6_execDaumPostcode()" value="주소찾기"><br>
                        </div> 
                        <input type="text" id="sample6_address" placeholder="주소" readonly><br>
                        <input type="text" id="sample6_detailAddress" placeholder="상세위치 ex) OO공원 00구역">
                        <input type="hidden" id="sample6_extraAddress" placeholder="참고항목" readonly>
                        </td>
            </tr>
            <tr style=" margin-top:5px;">
                <th colspan='3' style="font-size:24px;">모집요강</th>
            </tr>
            <tr>
               <td colspan='3'>
                <ckeditor v-model="editorData" :config="editorConfig"></ckeditor> 
                <!-- <input id="customFile" type="file" @change="handleFileChange"/> -->
                </td>
            </tr>
            <tr>
               <td>
                <input id="customFile" type="file" @change="readInputFile" multiple/>
                <v-img v-for="(item, i) in uploadimageurl" :key="i" :src="item.url"
                contain height="150px" width="200px" style="border: 2px solid black; margin-left:100px;"/>
               </td>
            </tr>
            <tr>
                <div id="imagePreview">
                    <img id="img" />
                </div>
            </tr>
    </table>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store';

export default  {
    
    name:'reg_FleaMarket',
    components:{
         
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
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            //데이터 전송용
            FleaMarket:{
                email:'',
                title: '',
                content: '< p > Content of the editor.</p> ',
                address: ''
            },
            address : ''
        }
    },
    props:{
        
    },
    mounted(){
        //  axios({
        //     url: "http://127.0.0.1:52273/content/content/",
        //     method: "POST",
        //     data: {
        //         id: this.$route.query.id
        //     },
        // }).then(res => {
        //     this.writer = res.data.writer;
        //     this.title = res.data.title;
        //     this.createdAt = res.data.createdAt.split('T')[0];
        //     this.updatedAt = res.data.updatedAt.split('T')[0];
        //     this.text = res.data.text;
        //     this.imagecnt = res.data.imagecnt;    // db에서 새로운 field인 imagecnt 값도 받아옴
        //     for (var i = 1; i <= res.data.imagecnt; i++) {
        //         this.imagelist.push(this.$route.query.id + '-' + i + '.png');
        //         // 이미지를 저장할 때, '글id - 1.png', '글id - 2.png', ... 이런식으로 저장할 것임
        //     }
        // }).catch(err => {
        //     alert(err);
        // });
    },
    created(){
          
    },
    methods:{
        //주소
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
        onImageChange(file) {    // v-file-input 변경시
            if (!file) {
                return;
            }
            const formData = new FormData();    // 파일을 전송할때는 FormData 형식으로 전송
            this.uploadimageurl = [];        // uploadimageurl은 미리보기용으로 사용
            file.forEach((item) => {
                formData.append('filelist', item)    // formData의 key: 'filelist', value: 이미지
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.uploadimageurl.push({ url: e.target.result });
                    // e.target.result를 통해 이미지 url을 가져와서 uploadimageurl에 저장
                };
                reader.readAsDataURL(item);
            });
            axios({
                url: "http://localhost:8081/cthg/imagesave",    // 이미지 저장을 위해 back서버와 통신
                method: "POST",
                headers: { 'Content-Type': 'multipart/form-data' },    // 이걸 써줘야 formdata 형식 전송가능
                data: formData,
            }).then(res => {
                console.log(res.data.message);
                this.imagecnt = file.length;    // 이미지 개수 저장
            }).catch(err => {
                alert(err);
            });
            
        },
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
                    var html = `<img src=${e.target.result} />`;
                    $('#imagePreview').append(html);
                };
                reader.readAsDataURL(f);
            })
        }
       
    }
}

</script>

<style scoped>
    
    .container{
        /* background: red; */
        width: 57%;
        margin: 0 auto;
        height: 80vh;
        box-shadow: 0 0 7px gray;
    }
    table {
       position: relative;
    top: 46%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 32px;
    width: 100%;
    /* height: 30%; */
    /* background: rgb(189, 179, 179); */
    }
        /* background: red; */

    table tr th{
        font-size: 17px;
        font-weight: bolder;
        /* border : 1px solid gray; */
        height: 54px;
    }
   

    table tr input[type=text]{
        width: 50%;
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
    




</style>