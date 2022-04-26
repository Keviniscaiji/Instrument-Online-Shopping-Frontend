<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
      <template>
        <lang-select class="avatar-container3"/>
      </template>
    <!-- <el-dropdown class="avatar-container2" trigger="click"> -->
    <el-button class="avatar-container2" @click="getChatList" type="primary">
          {{ $t('button.ChatList') }}
    </el-button>
    <el-drawer
      title="Chat List"
      :visible.sync="drawer"
      :with-header="false"
       size="50%">
      <el-table
        :data="userList"
        border
        fit
        highlight-current-row>
        <el-table-column prop="userId" label="userId" width="200"></el-table-column>
        <el-table-column prop="username" label="username" width="100"></el-table-column>
        <el-table-column prop="gmtCreate" label="time" width="200"></el-table-column>
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
            <router-link :to="'/chat/container/'+scope.row.userId">
                <el-button type="primary" size="mini" icon="el-icon-edit">{{ $t('button.Chat') }}</el-button>
            </router-link>
            </template>
        </el-table-column>
     </el-table>
    </el-drawer>
    <!-- </el-dropdown> -->
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            {{$t('role.home')}}
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">{{$t('role.logout')}}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import chat from '@/api/chat'
import {getPugeUserInfo} from "@/utils/auth"
import LangSelect from '@/components/LangSelect'

export default {
  data() {
    return {
      drawer: false,
      pugeUser: {},
      userList: {}
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
      // console.log("1243s")
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    },
    getChatList(){
      var userInfo = getPugeUserInfo();
      // console.log(userInfo)
      // console.log(userInfo);
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        this.pugeUser = userInfo;
      }
      const id = this.pugeUser.id
      console.log(id)
      chat.getChatList(id)
        .then(response => {
            this.userList = response.data.userList
            console.log(this.userList)
            this.drawer = true
        })
    }
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .chatlist {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .avatar-container2 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 120px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .avatar-container3 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 300px;
    
  }
}
</style>

