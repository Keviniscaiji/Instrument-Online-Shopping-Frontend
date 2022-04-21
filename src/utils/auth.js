import Cookies from 'js-cookie'


// const TokenKey = 'Admin-Token'
const pugeToken = "token"
const pugeKey = "user"

export function setPugeToken(token) {
  return Cookies.set(pugeToken, token);
}

export function getPugeToken(){
  return Cookies.get(pugeToken);
}

export function removePugeToken() {
  return Cookies.remove(pugeToken);
}

export function setPugeUserInfo(pugeUser){
  return Cookies.set(pugeKey, pugeUser)
}

export function getPugeUserInfo(){
  return Cookies.get(pugeKey);
}

export function removePugeUserInfo(){
  return Cookies.remove(pugeKey);
}