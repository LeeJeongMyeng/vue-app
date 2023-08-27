<template>
  <div class="container mt-3">
  	  <h1 class="display-1 text-center">사용자 목록</h1>
  	  <div class="btn-group">
  	    <a href="/user/save" class="btn btn-primary">사용자 추가</a>
  	  </div>
  	  <table class="table table-hover mt-3">
  	    <thead class="table-dark">
  	      <tr>
  	      	<th>이름</th>
  	        <th>이메일</th>
  	        <th>가입날짜</th>
  	      </tr>
  	    </thead>
  	    <tbody>
  	      <tr class="cursor-pointer" v-for="row in result" v-bind:key="row.no" v-on:click="$event=>href(row)">
  	        <td>{{row.name}}</td>
  	        <td>{{row.email}}</td>
  	        <td>{{row.regDate}}</td>
  	      </tr>
  	    </tbody>
  	  </table>
  	</div>
</template>

<script>
import axios from "axios";
import store from "@/store";
//import store from "vuex";

export default {
  name:'ListView',
  data(){
    return {
       result:[]
    }
  },
  //해당 화면이 실행되었을 때 바로 실행
  created() {
    console.log('List', this.$store.state.user)
    this.getData()
  },
  methods:{
    getData(){
      axios.post('/findAll')
          .then((response)=>{
            console.log(response)
            this.result=response.data.result
          }).catch((error)=>{
        console.log(error)
      })
    },
    //페이지이동
    href(row){
      console.log(row)
      /*
        query = 모든 데이터가 주소에 포함된다.
        params = 데이터만 보인다.
      **/

      // this.$router.push({name:'SelectView',query:row})
      this.$store.commit('setUser',row);
      sessionStorage.setItem('setUser', this.base64(row))
      this.$router.push({name:'SelectView'})
    },

    //암호화 => 데이터를 인코딩해서 암호화시킴
    base64(user){
      return window.btoa(encodeURIComponent(JSON.stringify(user)))
    }
  }
}
</script>

<style>

</style>