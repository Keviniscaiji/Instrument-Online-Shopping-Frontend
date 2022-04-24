<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ pugeUser.nickname }}</div>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import {getPugeUserInfo} from "@/utils/auth"

export default {
  name: 'Dashboard',
  data() {
    return {
      pugeUser: {},
    }
  },
  created() {
    
  },
  mounted() {
    this.getCookieUserInfo();
  },
  methods: {
    getCookieUserInfo(){
      var userInfo = getPugeUserInfo();
      // console.log(userInfo)
      // console.log(userInfo);
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        this.pugeUser = userInfo;
      }

    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
