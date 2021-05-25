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

export function setCurrentUser(user) {
    localStorage.setItem('ishare_updated_user', JSON.stringify(user));
}

export function getCurrentUser() {
    try {
        const user = localStorage.getItem('ishare_updated_user');
        if (user)
            return JSON.parse(user);
      const jwt = localStorage.getItem("ishare_token");
      return jwtDecode(jwt);
    } catch (ex) {
        return null;
     }
}

export function logout() {
    localStorage.removeItem("ishare_token");
    localStorage.removeItem("ishare_updated_user");
}

export function getJwt() {
    return localStorage.getItem("ishare_token");
}