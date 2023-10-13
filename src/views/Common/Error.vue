<template>
    <div class="error-page">
        <h1 class="Error-title">Error Page</h1>
        <div class="error-box">
            <h1 class="error-title" v-if="errorCode">{{ errorCode }}</h1>
            <h1 class="error-title" v-else>에러</h1>
            <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
            <p class="error-message" v-else>잘못된 접근입니다.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorPage',
   data() {
        return {
            errorCode: this.$route.params.errorCode,
            errorMessage: this.$route.params.errorMessage
        }
    },
    methods: {
        retry() {
            // Retry logic here
            // 예를 들어, 페이지 새로고침 등을 수행할 수 있습니다.
            location.reload();
        }
    }
};
</script>

<style scoped>
.error-page {
    display: flex;
    flex-direction: column; /* stack child elements vertically */
    justify-content: center;
    align-items: center;
    width: 100%;
    /* background: rebeccapurple; */
    height: 673px;
}
.Error-title{
    font-size: 99px;
    margin: -78px 0 -14px 0;
    font-weight: bolder;
    background: white;

    /* Add these lines */
    position: relative;
    z-index: 1;
}
    .error-box {
    padding: 0.5rem;
    border-radius: 0.25rem;
    text-align: center;
    width: 1000px;
    height: 283px;
    box-shadow: 0 0 5px black;

    /* Add these lines */
    display: flex;
    flex-direction: column; /* stack child elements vertically */
    justify-content: center; /* center children vertically */
}

.error-image {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 200px;
}

.error-title {
    font-size: 3rem;
    color: red;
    font-weight: bolder;
    margin: 0 0 10px 0;
}

.error-message {
    font-size: 1.5rem;
    font-weight: bolder;
}

.retry-button {
    padding: .5rem .75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: .25rem;
    font-size: .875rem;
}

.retry-button:hover {
    background-color: #0056b3;
}
</style>