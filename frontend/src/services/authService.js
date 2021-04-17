import { apiEndPoint } from '../config.json';
import http from './httpService';
import jwtDecode from 'jwt-decode';

const endPoint = `${apiEndPoint}/auth`;

http.setJwt(getJwt());

export async function login(user) {
    const { data } = await http.post(endPoint, {
        email: user.username,
        password: user.password
    });
    localStorage.setItem('ishare_token', data.jsonWebToken);
}

export function getCurrentUser() {
    try {
      const jwt = localStorage.getItem("ishare_token");
      return jwtDecode(jwt);
    } catch (ex) {
        return null;
     }
}

export function logout() {
    localStorage.removeItem("ishare_token");
}

export function getJwt() {
    return localStorage.getItem("ishare_token");
}