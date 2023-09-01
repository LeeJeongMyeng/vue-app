<template>
    <header>
        <h1>Contigo</h1>
        <div class="NavContainer bv-example-row">
        <b-col cols="8">
             <ul class="nav" id="header-nav1">
                <li>플리마켓</li>
                <li>공지사항</li>
                <li>문의글</li>
            </ul>
        </b-col>
        <b-col cols="4">
            <ul class="nav" id="header-nav2">
                <li>로그인</li>
                <li>회원가입</li>
                <li>내정보</li>
            </ul>
        </b-col>
        </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
    header {
        background: skyblue;
    }

    /* 헤더 제일 상단 메인글씨 */
    h1{
        font-size: 100px;
        text-align: center;
    }
    /* 메뉴바 큰 컨테이너 */
    .NavContainer{
        display: flex;
        justify-content: center;     
    }
    /* 각메뉴바(메뉴,회원메뉴) */
    .nav{
        justify-content: right;       
    }
    /* 상단메뉴 */
    #header-nav1{
        margin-right: 159px;
    }
    /* 회원메뉴 */
    #header-nav2{
        margin-right: 100px;
    }
    /* 각 메뉴안의 li */
    .nav li{
        padding : 10px 20px; 
        font-size : 20px;
        font-weight: bold;   
    }
</style>