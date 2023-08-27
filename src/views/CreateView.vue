<template>
  <div class="container mt-3">
    <h1 class="display-1 text-center">사용자 정보</h1>
    <form>
      <div class="mb-3 mt-3">
        <label for="name" class="form-label">이름:</label>
        <input type="text" class="form-control" id="name" placeholder="이름을 입력하세요." name="name" autocomplete="off" :class="{active:active.name}"  v-model="result.name">
      </div>
      <div class="mb-3 mt-3">
        <label for="email" class="form-label">이메일:</label>
        <input type="email" class="form-control" id="email" placeholder="이메일를 입력하세요." name="email" autocomplete="off" :class="{active:active.email}" v-model="result.email">
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">비밀번호:</label>
        <input type="password" class="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd" autocomplete="off" :class="{active:active.pwd}" v-model="result.pwd">
      </div>
      <div class="d-flex">
        <div class="p-2 flex-fill">
          <div class="form-check">
            <input type="radio" class="form-check-input" id="radio1" name="gender" v-bind:value="true" v-model="result.gender" checked>남성
            <label class="form-check-label" for="radio1"></label>
          </div>
        </div>
        <div class="p-2 flex-fill">
          <div class="form-check">
            <input type="radio" class="form-check-input" id="radio2" name="gender" v-bind:value="false" v-model="result.gender">여성
            <label class="form-check-label" for="radio2"></label>
          </div>
        </div>
      </div>
    </form>
    <div class="d-flex">
      <div class="p-2 flex-fill d-grid">
        <button type="button" class="btn btn-primary" @click="create">생성</button>
      </div>
      <div class="p-2 flex-fill d-grid">
        <button type="button" class="btn btn-primary" @click="cancle">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:'CreateView',
  data(){
    return{
      result:{name:'',email:'',pwd:'',gender:true},
      active:{name:false,email:false,pwd:false}
    }
  },
  created() {
  },
  methods:{
    cancle(){
      this.$router.push({name:'ListView'})
    },
    create(){
     // console.log(this.result)

      if(this.result.name==''){
        this.active.name=true
        return
      }else{
        this.active.name=false;
      }
      if(this.result.email==''){
        this.active.email=true
        return
      }else{
        this.active.email=false;
      }
      if(this.result.pwd==''){
        this.active.pwd=true
        return
      }else{
        this.active.pwd=false;
      }

      //console.log(this.result.name)

      //console.log(this.result)

      axios.put('/save',this.result)
          .then((res) => {
            console.log(res)
            this.$store.commit('setUser',res.data.result)
            sessionStorage.setItem('setUser',this.base64(res.data.result))
            this.$router.push({name:'SelectView'})
          })
          .catch((err) => console.log(err))
    },
    base64(user){
      return window.btoa(encodeURIComponent(JSON.stringify(user)))
    }
  }
}
</script>

<style>

.active{
  background-color: #bfe2e9;

}
</style>