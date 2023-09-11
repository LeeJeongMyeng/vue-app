<template>
<div>
    <div class="container">
        <div class="InfoBox">
            <table id="Notic_table">
                <tr>
                    <th class="Notic_th">제목</th>  
                    <td class="Notic_td">{{ Notic.title}}</td>  
                    <th class="Notic_th">중요도</th>  
                    <td class="Notic_td">중요글</td>  
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
                    <td colspan="3">
                        <div v-for="item in Notic_files" :key="item.fileno">
                           {{ item.origin_file_name }} 
                        </div>
                    </td>

                </tr>
            </table >
        </div>
        <ckeditor id="ckeditor" v-model="Notic.content" :config="editorConfig"></ckeditor>
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
        this.get_Notic();
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
      
    },
    
    methods:{
        //페이지 랜더링시 데이터 호출
        get_Notic(){
            axios.get('/ctg/get_Notic', {params:{ntno:this.$route.query.ntno }})
                .then((res) => {
                    console.log(res)
                    this.Notic = res.data.Notic;
                    this.Notic_files = res.data.Notic_files;
                })
                .catch((err) => console.log(err))
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