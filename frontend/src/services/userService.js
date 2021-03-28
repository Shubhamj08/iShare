import http from './httpService';
import { apiEndPoint } from '../config.json';

const endPoint = `${apiEndPoint}/users`;

export function register(user) {
    return http.post(endPoint, {
        username: user.username,
        email: user.email,
        password: user.password
    });
}