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
                           {{ item.origin_file_name }} 
                        </div>
                    </td>
                </tr>
            </table >
        </div>

        <div id="ckeditor" style="height: 500px;" v-html="decodedContent(Notic.content)"></div>
        <img src="../../assets/img/Notic/bnnnnnnnnnnnnnn.jpg">
      
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
                const replacedValue = value.replace("src=&#34;/pandora3/resources/pandora3/images/upload/ckediter/", ":src=&#34;require('@/assets/img/Notic/");
                const replacedValue2 = replacedValue.replace("jpg","jpg')");
                 console.log(replacedValue);
                 const parser = new DOMParser();
                 const decodedHtml = parser.parseFromString(replacedValue2, 'text/html').body.textContent;
                return decodedHtml;
                
            }
            return '';
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