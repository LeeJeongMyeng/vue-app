<template>
<div>
  <div class="container">
    <div class="InfoBox">
        <h1 class="Info_title">&#91;{{ FleaMarket.title}}&#93;<span :class="active_css.FM_state">&#40;{{ FleaMarket.state }}&#41;</span></h1><br><br>
        <div id="Info_address"><span id="Info_address_sp">👉&#91;행사 진행장소&#93; </span>{{ FleaMarket.location }} {{ FleaMarket.sub_location }}</div><br>
        <div id="Info_endDate"><span id="Info_endDate_sp">👉&#91;신청 마감일자&#93; </span>{{ FleaMarket.end_date }}</div><br>
        <div id="Info_endDate"><span id="Info_endDate_sp">👉&#91;모집인원 수&#93; </span>{{ FleaMarket.max_applicants }}명</div><br>
        <div id="Info_endDate"><span id="Info_endDate_sp">👉&#91;현재 참가승인인원&#93; </span>{{ FleaMarket.current_count }}명</div><br>

    </div>
    <div id="Info_Img_Box">
                            <h1 style="text-align: center; font-size: 28px; font-weight: bold; padding: 52px 0 0 0;">현재 첨부된 행사 이미지</h1>
                            <hr style="width: 80%;">
                            <div class="image-container">
                            <div class="image-item" v-for="item in FleaMarket_files" :key="item.post_id">
                            <img id="cardImg" :src="getImagePath(item.uuid_file_name)" alt="">
                            </div>
                            </div>
                            <hr style="width: 80%;">
                        </div>

    <h1 class="Info_title">모집 상세 설명(필독!)</h1>
    
    <ckeditor id="ckeditor" v-model="FleaMarket.content" :config="editorConfig"></ckeditor>
    
    <div id="get_controlbox" v-if="FleaMarket.user_id == this.$store.state.user_id">
        <button type="button" class="getFMbtn" @click="openModal"> 신청자 확인 </button>
        <button type="button" class="getFMbtn" @click="Go_to_uptPage" > 수정 </button>
        <button type="button" class="getFMbtn" id="delFMbtn" @click="Del_FleaMarket"> 삭제 </button>
    </div>
    <div id="get_controlbox" v-else>
        <button type="button" class="getFMbtn" @click="application_FM" > 신청하기 </button>
        <!-- <button type="button" class="getFMbtn" id="delFMbtn" @click="Check_Reg"> 삭제 </button> -->
    </div>
 
   

    <!-- <div style="display: flex;"><button type="button" id="regFMbtn" @click="check"> 게시글 등록 </button></div> -->
  </div>

   <!-- 모달창 -->
         <div v-if="isModalOpen" class="modal">
            <div class="modal-overlay" @click="closeModal"></div> <!-- 모달 배경 -->

            <div class="modal-content">
                <!-- 닫기 버튼 -->
                    <button type="button" class="close-button" @click="closeModal">X</button>
                <!-- 모달 내용 -->
                <div>
                <h1>대기 신청자</h1>
                    <table class="modal_application_tableH">
                        <thead>
                            <tr>
                            <th class="application_table_th" style="width: 11%;">회원 번호</th>
                            <th class="application_table_th" style="width: 11%;">이름</th>
                            <th class="application_table_th" style="width: 16%;">이메일</th>
                            <th class="application_table_th" style="width: 16%;">연락처</th>
                            <th class="application_table_th" style="width: 18%;">주소</th> 
                            <th class="application_table_th" style="width: 13%;">신청날짜</th> 
                            <th class="application_table_th" style="width: 15%;">비고</th> 
                            </tr>
                        </thead>
                    </table>
                    <div class="application_tbody">
                    <table class="modal_application_table">
                    <tbody>
                            <tr v-for="item in wait_appliication_FM" :key="item.user_id">
                                <td style="width: 11%;">{{ item.user_id }}</td>
                                <td style="width: 11%;">{{ item.name }}</td>
                                <td style="width: 16%;">{{ item.email }}</td>
                                <td style="width: 16%;">{{ item.phone_number }}</td>
                                <td style="width: 18%;">{{ item.address }}</td>
                                <td style="width: 15%;">{{ item.reg_date }}</td>
                                <td style="width: 13%;"><div></div><button  class="application_btn approve-button" @click="approval_FM('승인', item.user_id)">승인</button><button class="application_btn reject-button"  @click="approval_FM('거절', item.user_id)">거절</button></td>
                            </tr>
                        </tbody>   
                    </table>
                    </div>
                </div>
                <div>
                <h1>승인된 신청자</h1>
                    <table class="modal_application_tableH">
                        <thead>
                            <tr>
                            <th class="application_table_th" style="width: 11%;">회원 번호</th>
                            <th class="application_table_th" style="width: 11%;">이름</th>
                            <th class="application_table_th" style="width: 16%;">이메일</th>
                            <th class="application_table_th" style="width: 16%;">연락처</th>
                            <th class="application_table_th" style="width: 18%;">주소</th> 
                            <th class="application_table_th" style="width: 13%;">신청날짜</th> 
                            <th class="application_table_th" style="width: 15%;">비고</th> 
                            </tr>
                        </thead>
                    </table>
                    <div class="application_tbody">
                    <table class="modal_application_table">
                    <tbody>
                            <tr v-for="item in approval_appliication_FM" :key="item.user_id">
                                <td style="width: 11%;">{{ item.user_id }}</td>
                                <td style="width: 11%;">{{ item.name }}</td>
                                <td style="width: 16%;">{{ item.email }}</td>
                                <td style="width: 16%;">{{ item.phone_number }}</td>
                                <td style="width: 18%;">{{ item.address }}</td>
                                <td style="width: 15%;">{{ item.reg_date }}</td>
                                <td><div></div><button class="application_btn reject-button" @click="approval_FM('거절', item.user_id)">거절</button><button class="application_btn wait-btn" @click="approval_FM('대기', item.user_id)">대기</button></td>
                            </tr>
                        </tbody>   
                    </table>
                    </div>
                </div>
                <div>
                    <h1>거절된 신청자</h1>
                        <table class="modal_application_tableH">
                            <thead>
                                <tr>
                                <th class="application_table_th" style="width: 11%;">회원 번호</th>
                                <th class="application_table_th" style="width: 11%;">이름</th>
                                <th class="application_table_th" style="width: 16%;">이메일</th>
                                <th class="application_table_th" style="width: 16%;">연락처</th>
                                <th class="application_table_th" style="width: 18%;">주소</th> 
                                <th class="application_table_th" style="width: 13%;">신청날짜</th> 
                                <th class="application_table_th" style="width: 15%;">비고</th> 
                                </tr>
                            </thead>
                        </table>
                        <div class="application_tbody">
                        <table class="modal_application_table">
                        <tbody>
                                <tr v-for="item in reject_appliication_FM" :key="item.user_id">
                                    <td style="width: 11%;">{{ item.user_id }}</td>
                                    <td style="width: 11%;">{{ item.name }}</td>
                                    <td style="width: 16%;">{{ item.email }}</td>
                                    <td style="width: 16%;">{{ item.phone_number }}</td>
                                    <td style="width: 18%;">{{ item.address }}</td>
                                    <td style="width: 15%;">{{ item.reg_date }}</td>
                                    <td><div></div><button  class="application_btn approve-button" @click="approval_FM('승인', item.user_id)">승인</button><button  class="application_btn wait-btn" @click="approval_FM('대기', item.user_id)">대기</button></td>
                                    </tr>
                            </tbody>   
                        </table>
                        </div>
                    </div>
            </div>
        </div>
    </div>
   
</template>

<script>
import axios from "axios";

export default  {
    
    name:'upt_get_FleaMarket',
    components:{
    },
    computed:{
       user_id() {
            
        }
    },
    created(){
        this.get_Fleamarket();
        this.get_application_FM();
    },
    
    data() {
        return {
            common:{
                post_id:this.$route.query.post_id
            },
            //CKEditer
            editorConfig: {
                readOnly:true,
                height : '700px'
                // The configuration of the editor.
            },
            //axios로받은 글+파일데이터
            FleaMarket:{
            },
            //모집중/모집마감 css
            FleaMarket_files:[],
            active_css: {
                FM_state: ''
                
            },
            //모달
            isModalOpen: false,
            //모달안에 승인/거절/대기용 데이터
            application_FM_data:{
                post_id: this.$route.query.post_id,
                state: '',
                user_id: '',

            },
            approval_appliication_FM:'',
            reject_appliication_FM:'',
            wait_appliication_FM:'',
        }
    },
    setup() {

    },
    mounted(){
      
    },
    
    methods:{
        //페이지 랜더링시 데이터 호출
        get_Fleamarket(){
            console.log(this.$route.query.post_id)
            axios.get('/ctg/get_FleaMarket', {params:{post_id:this.$route.query.post_id }})
                .then((res) => {
                    console.log(res)
                    var FleaMarket = res.data.FleaMarket;

                    FleaMarket.sub_location = this.processHTML(FleaMarket.sub_location);
                    FleaMarket.title = this.processHTML(FleaMarket.title);

                    console.log('adasdasda',FleaMarket)

                    this.FleaMarket = FleaMarket;
                    
                    this.FleaMarket_files = res.data.FleaMarket_files
                    if(res.data.FleaMarket.state =='모집중'){
                        this.active_css.FM_state = 'font_blue';
                    }else{
                        this.active_css.FM_state = 'font_red';
                    }
                })
                .catch((err) => console.log(err))
        },
        //수정페이지로 이동
        Go_to_uptPage() {
           // console.log(pagename);
            this.$router.push({ name:'upt_FleaMarket', query: { post_id: this.FleaMarket.post_id } });
            //this.$router.push(pagename)
        },
        //게시글 삭제
        Del_FleaMarket(){
            if(confirm('해당 게시글을 삭제 삭제하시겠습니까?')){
                if(this.FleaMarket.user_id == this.$store.state.user_id){
                axios.get('/ctg/del_FleaMarket', { params: {post_id: this.FleaMarket.post_id } })
                    .then((res) => {
                        console.log(res)
                        alert("삭제가 완료되었습니다.");
                        this.$router.push('/');

                    })
                    .catch((err) => console.log(err))
                }else{
                    alert('접근불가');
                    this.$router.push('/');
                }
            }else{
                return false;
            }
        },
        //데이터 이미지 처리시에 이미지path설정
        getImagePath(filename) {
            return require('@/assets/img/fleamarket/' + filename);
        },
        
        // 모달 열기
         openModal() {
            this.isModalOpen = true; 
          
        },
        // 모달 닫기
        closeModal() {
            this.isModalOpen = false; 
           
        },
        //신청자 목록 가져오기(모달창에 데이터 할당)
        get_application_FM(){
            const data = {
                post_id: this.$route.query.post_id
            };
             axios.post('/ctg/get_application_FM',data)
                .then((res) => {
                    console.log(res)
                    console.log('신청자 목록가져오기')
                    this.approval_appliication_FM = res.data.approval_appliication_FM;
                    this.reject_appliication_FM = res.data.reject_appliication_FM;
                    this.wait_appliication_FM = res.data.wait_appliication_FM;
                })
                .catch((err) => console.log(err))
        },
        //수락/거절/대기 로 변경
       approval_FM(state, user_id) {
             const data = {
                post_id: this.$route.query.post_id,
                state: state,
                user_id: user_id
            };
            
            axios.post('/ctg/upt_application_FM', data)
                .then((res) => {
                    //수정-> 승인갯수확인 업데이트하고 승인갯수 리턴받음
                    console.log(res)
                    this.FleaMarket.current_count = res.data;
                    this.get_application_FM()
                    alert(state+'처리 되었습니다.')
                })
                .catch((err) => console.log(err))
        },
        //신청하기
        application_FM() {
            console.log(this.$store.state.user_id)
            //로그인 안하고 신청시
            if(!this.$store.state.user_id || this.$store.state.user_id ==''){
                alert('로그인 이후 이용 부탁드립니다.')
                //this.$router.push('/user/signIn')
                return false;
            }
            //종료된 게시글일경우
            if (this.FleaMarket.state == '모집종료') {
                alert('해당 게시글은 모집마감 했습니다.');
                return false;
            }
            //정원 다찼을 때
            if (this.FleaMarket.current_count == this.FleaMarket.max_applicants) {
                alert('모집인원을 다 채웠습니다. 다음에 다시 이용부탁드립니다.')
                return false;
            }
            axios.get('/ctg/application_FM', { params: { post_id: this.$route.query.post_id, user_id: this.$store.state.user_id } })
                .then((res) => {
                    console.log(res)
                    if (res.data == 1) {
                        alert("신청 완료되었습니다.")
                    } else {
                        alert("중복신청은 불가합니다.")
                    }

                })
                .catch((err) => console.log(err))
        },
        //xss처리
         sanitizeInput(value) {
            value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
            value = value.replaceAll("'", "&#39;");
            value = value.replace(/eval\((.*)\)/g, "");
            value = value.replace(/["'][\s]*javascript:(.*)["']/g, "\"\"");
            value = value.replace(/script/g, "");
            return value;
        },
        //xss처리된거 반환
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
    
     .container{
        width: 57%;
        margin: 0 auto;
        box-shadow: 0 0 7px gray;
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

   .getFMbtn{
    margin: 0 26px;
    width: 20%;
    height: 45px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 4px purple;
    background: #bc44bc;
    font-size: 18px;
    font-weight: bold;
    color: white;
   }
   #delFMbtn{
    box-shadow: 0 0 4px #82807d;
    background: #82807d;
   }
    
   table tr td>span{
    font-size: 12px;
    color: red;
    font-weight: bold;
   }

   .Info_title{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 15px;
   }

   #Info_address_sp,#Info_endDate_sp{
    font-weight: bold;
    padding-left: 15px;
   }
   #get_controlbox{
    display: flex;
    /* width: 74%; */
    justify-content: center;
    padding: 10px 0;
   }
      .image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.image-item {
  margin-right: 10px; 
}

.font_red{
    color:red;
    font-weight: bold;
}
.font_blue{
    color:blue;
    font-weight: bold;
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
    transform: translate(-50%,3%);
    width: 1200px;
    height: 800px;
    border-radius: 15px;
    background-color: #ffffff;
    /* border: 2px solid; */
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

.modal_application_table {
   width: 100%;
   margin:0px auto;
}
.modal_application_tableH {
   width: 100%;
   margin:0px auto;
}
.modal-content>div{
    height: 30%;
    border-bottom: 1px solid;
    
}
.application_tbody{
    max-height: 160px;
    overflow-y: scroll;
}
.modal-content div h1{
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
  color: white;
  border: none;
  margin: 0px 5px;
  border-radius: 4px;
}

.approve-button {
  background-color: #4CAF50; /* 녹색 */
}

.reject-button {
  background-color: #F44336; /* 빨간색 */
}

.wait-btn{
  background-color: #6c6c6c;  
}

</style>