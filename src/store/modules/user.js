import { logout, pugeInfo } from '@/api/login'
import {  setPugeToken, getPugeToken, removePugeToken, setPugeUserInfo, removePugeUserInfo } from '@/utils/auth'

const user = {
  state: {
    token: getPugeToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, pugeUser) => {
      state.pugeUser = pugeUser
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, pgtoken) {
      return new Promise((resolve, reject) => {
        console.log(127172)
          setPugeToken(pgtoken);
          console.log(pgtoken)
          commit('SET_TOKEN', pgtoken);
          resolve();
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      // console.log(111)
      return new Promise((resolve, reject) => {
        pugeInfo()
          .then(response => {
            const data = response.data
          //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          //   } else {
          //   reject('getInfo: roles must be a non-null array !')
          //  }
          // console.log(response.data)
          // // console.log(data)
          setPugeUserInfo(data.userInfo)
          commit('SET_NAME', data.userInfo.nickname)
          commit('SET_AVATAR', data.userInfo.avatar)
          resolve(response)
        }).catch(error => {
          // console("error user")
            reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removePugeToken();
          removePugeUserInfo();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      console.log("gundanle")
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removePugeToken();
        removePugeUserInfo();
        resolve()
      })
    }
  }
}

export default user
