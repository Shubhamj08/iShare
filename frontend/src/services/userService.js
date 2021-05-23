import http from './httpService';
import { apiEndPoint } from '../config.json';

const endPoint = `${apiEndPoint}/users`;

export async function getAuthor(id) {
    const { data: author } = await http.post(`${endPoint}/user`, { id });
    return author;
}

export function register(user) {
    return http.post(endPoint, {
        username: user.username,
        email: user.email,
        password: user.password
    });
}

export async function changePassword(email, curr_password, new_password) {
    const data = await http.put(`${endPoint}/user/changepass`, { email, curr_password, new_password });
    return data;
}