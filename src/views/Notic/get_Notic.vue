<template>
<div>
    <div class="container">
        <div class="InfoBox">
            <table id="Notic_table">
                <tr>
                    <th class="Notic_th">제목</th>  
                    <td class="Notic_td">{{ Notic.title}}</td>  
                    <th class="Notic_th">중요도</th>  
                    <td class="Notic_td" v-if="Notic.impWhether" style="color:red">중요글</td>
                    <td class="Notic_td" v-else>일반글</td> 
                </tr>
                <tr> 
                    <th class="Notic_th">작성일</th>
                    <td class="Notic_td">{{ Notic.regDate}}</td>
                    <th class="Notic_th">공지종료일</th>
                    <td class="Notic_td" v-if="Notic.delDateCheck">{{ Notic.endDate }}</td>
                    <td class="Notic_td" v-else>-</td>
                </tr>
                <tr>
                    <th class="Notic_th">첨부파일</th>
                    <td colspan="3" class="Notic_td">
                        <div v-for="item in Notic_files" :key="item.fileno">
                            <a href="#" @click="filedownload(item.origin_file_name,item.chg_source_filename)">{{ item.origin_file_name }}</a>
                           
                        </div>
                    </td>
                </tr>
            </table >
        </div>

        <div id="ckeditor" style="height: 500px;" v-html="decodedContent(Notic.content)"></div>
      
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
     
    },
    created(){
       
    },
    filters: {
       
    },
    
    data() {
        return {
            common:{
                ntno:this.$route.query.ntno
            },
            //CKEditer
            editorConfig: {
                readOnly:true,
                height : '700px'
                // The configuration of the editor.
            },
            //axios로받은 글+파일데이터
            Notic:'',
            Notic_files:''
            //모집중/모집마감 css
        }
    },
    setup() {

    },
    mounted(){
       this.get_Notic();
    },
    
    methods:{
        //페이지 랜더링시 데이터 호출
        get_Notic(){
            console.log(this.$route.query.ntno)
            axios.get('/ctg/get_Notic', {params:{ntno:this.$route.query.ntno }})
                .then((res) => {
                    console.log(res)
                    this.Notic = res.data.Notic;
                    this.Notic_files = res.data.Notic_files;
                    this.decodedContent(res.data.Notic.content);
                })
                .catch((err) => console.log(err))
        },
        decodedContent(value) {
            console.log(value)
            if (value) {
                const replacedValue = value.replace("src=&#34;/pandora3/resources/pandora3/images/upload/ckediter/", ":src=&#34;@/assets/img/Notic/");
                //const replacedValue2 = replacedValue.replace("jpg","jpg')");
                 console.log(replacedValue);
                 const parser = new DOMParser();
                 const decodedHtml = parser.parseFromString(replacedValue, 'text/html').body.textContent;
                return decodedHtml;
                
            }
            return '';
        },
        
        filedownload(originFileName, chgSourceFilename) {
            // 자바 서버로 파일 다운로드를 처리하기 위해 Axios를 사용하여 GET 요청을 보냅니다.
            axios({
                method: 'get',
                url: '/ctg/filedownload', // 실제 엔드포인트 URL로 대체해주세요.
                responseType: 'blob', // 이진 데이터를 처리하기 위해 응답 타입을 blob으로 설정합니다.
                params: {
                    filename: chgSourceFilename // 변경된 소스 파일 이름을 매개변수로 전달합니다.
                }
            })
                .then(response => {
                    console.log(response.data)
                    //서버에서 path+file에 대해 ResponseEntity로 build값을 반환해서 url로 설정
                    const url = window.URL.createObjectURL(new Blob([response.data]));

                    // a태그 임시생성해서 href속성에 url지정
                    const link = document.createElement('a');
                    link.href = url;

                    // <a url ='' download="파일이름.확장자"></a>형식이다.
                    link.setAttribute('download', originFileName);
                    
                    //임시 생성한 a태그를 랜더링
                    document.body.appendChild(link);
                    //클릭해서 다운로드
                    link.click();

                    // 다운로드 이후 위에서 선언한 속성값(url,임시a태그 제거)
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                })
                .catch(error => {
                    console.error(error);
                });
            }
            
        
        
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

   #Notic_table {
    width: 100%;
  }
  
  .Notic_th {
   border: 1px solid black;
    background-color: lightgray;
    width: 20%;
    padding: 8px;
    font-weight: bold;
  }
  
  .Notic_td {
     width: 30%;
     border: 1px solid black;
     padding: 8px;
  }

</style>