export const common = {
  methods: {
    Logout_Ctg_Member() {
      if (confirm("로그아웃 하시겠습니까?")) {
        axios
          .post("/ctg/logout")
          .then((res) => {
            console.log(res);

            this.$store.commit("setAccount", null);
            this.$store.dispatch("ctl_Log_Btn", false);
            sessionStorage.removeItem("user_id");
            Cookies.remove("token"); // 쿠키 삭제
            //여기에 페이지 이동 넣어야함
            this.$emit("data", true);

            this.Control_Log_Btn();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
