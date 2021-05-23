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

export async function likeIdea(idea) {
    const originalIdea = idea;
    if (idea.liked) {
      try {
          await http.put(`${apiEndPoint}/ideas/like`, idea);
      } catch (ex) {
          return originalIdea;
      }
    } else {
      try {
        await http.put(`${apiEndPoint}/ideas/dislike`, idea);
      } catch (ex) {
          return originalIdea;
      }
    }

    return idea;
}