import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface Payload {
  username: string;
  email: string;
  sub: string;
  isAdmin: boolean;

}

export function isLoggedIn() {
  if (typeof Cookies.get('token') !== 'undefined') {
    if (Cookies.get('token') === 'undefined') {
      Cookies.remove("token")
      return false;
    }
    return true;
  }else{
    return false;
  }
}

export function signOut() {
  Cookies.remove("token");
}

export function getToken() {
  return Cookies.get("token");
}

export function decodeToken(){
  if(!isLoggedIn()) return undefined;
  const token = Cookies.get("token");
  if (token) {
      const decoded = jwt_decode(token) as Payload;
      return decoded;
  }
}

export function getEmail() {
  if(!isLoggedIn()) return undefined;
  const token = decodeToken();
  if (token) {
    return token.email;
  }
}

export function getUsername() {
  if(!isLoggedIn()) return undefined;
  const token = decodeToken();
  if (token) {
    return token.username;
  }
}

export function getSub() {
  if(!isLoggedIn()) return "";
  const token = decodeToken();
  if (token) {
    return token.sub;
  }else{
    return "";
  }
}

export function getIsAdmin() {
  if(!isLoggedIn()) return false;
  const token = decodeToken();
  if (token) {
    return token.isAdmin;
  }
}