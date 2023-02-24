import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface Payload {
  username: string;
  email: string;
  sub: string;
  isAdmin: boolean;

}

export function isLoggedIn() {
  return Cookies.get("token") != undefined;
}

export function signOut() {
  Cookies.remove("token");
}

export function getToken() {
  return Cookies.get("token");
}

export function decodeToken(){
  const token = Cookies.get("token");
  if (token) {
      const decoded = jwt_decode(token) as Payload;
      return decoded;
  }
}

export function getEmail() {
  const token = decodeToken();
  if (token) {
    return token.email;
  }
}

export function getUsername() {
  const token = decodeToken();
  if (token) {
    return token.username;
  }
}

export function getSub() {
  const token = decodeToken();
  if (token) {
    return token.sub;
  }
}

export function getIsAdmin() {
  const token = decodeToken();
  if (token) {
    return token.isAdmin;
  }
}