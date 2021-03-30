import http from './httpService';
import { apiEndPoint } from '../config.json';

export async function getIdeas() {
    const { data: ideas } = await http.get(`${apiEndPoint}/ideas`);
    ideas.forEach(idea => {
        idea.nLikes = idea.likes.length;
    });
    return ideas;
}

export async function getIdea(id) {
    const ideas = await getIdeas();
    return ideas.find(idea => { return idea._id === id });
}