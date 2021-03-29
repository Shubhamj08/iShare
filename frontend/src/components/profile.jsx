import React, { Component } from 'react';
import http from '../services/httpService';
import { apiEndPoint } from '../config.json';
import IdeaList from './ideaList';
import '../css/profile.css';

class Profile extends Component {

    state = {
        user: {
            ideas: [],
        },
        likedIdeas:[]
    }

    async componentDidMount() {
        const { data } = await http.get(`${apiEndPoint}/auth/me`);
        const user = { ...data };
        user.ideas.forEach(idea => {
            const idx = user.ideas.indexOf(idea);
            if (data) {
                if (idea.likes.includes(user._id)) {
                    user.ideas[idx] = { ...user.ideas[idx] };
                    user.ideas[idx].liked = true;
                }
                user.ideas[idx].nLikes = idea.likes.length;
            }
        });

        const likedIdeas = this.props.ideas.filter((idea) => { return idea.liked });
        this.setState({ user, likedIdeas });
    }

    handleLike = async (idea) => {
        const originalIdeas = this.state.user;
        const user = { ...this.state.user };
        const idx = user.ideas.indexOf(idea);
        user.ideas[idx] = { ...user.ideas[idx] };

        if (!idea.liked) {
            user.ideas[idx].liked = true;
            user.ideas[idx].nLikes += 1;
            this.setState({ user });
            try {
                await http.put(`${apiEndPoint}/ideas/like`, idea);
            } catch (ex) {
                this.setState({ originalIdeas });
            }
        } else {
            user.ideas[idx].liked = false;
            user.ideas[idx].nLikes -= 1;
            this.setState({ user });
            try {
                await http.put(`${apiEndPoint}/ideas/dislike`, idea);
            } catch (ex) {
                this.setState({ originalIdeas });
            }
        }
    }
  
    handleShare = (idea) => {
        console.log("Share button clicked", idea);
    }

    render() {
        const { user, likedIdeas } = this.state;
        return (
            <div className="row mt-3">
                <div className="col-sm-3 info">
                    <h4 className="display-4 text-center">{user.username && user.username.toUpperCase()}</h4>
                    <p className="text-center">{user.email && user.email}</p>
                </div>
                <div className="col-sm-9">
                    <h4>Your Ideas</h4>
                    <IdeaList
                        ideas={user.ideas}
                        user={user}
                        onLike={this.handleLike}
                        onShare={this.handleShare}
                    />

                    <hr className="mb-5" />
                    <h4>Ideas that you liked!</h4>
                    <IdeaList
                        ideas={likedIdeas}
                        user={user}
                        onLike={() => { }}
                        onShare={() => { }}
                    />
                </div>
            </div>

         );
    }
}
 
export default Profile;