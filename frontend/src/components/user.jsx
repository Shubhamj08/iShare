import React, { Component } from 'react';
import { getAuthor } from '../services/userService';
import IdeaList from './ideaList';

class User extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                username: "",
                email: ""
            }
        }
    }

    componentDidMount = async () => {
        const id = this.props.match.params._id;
        const user = await getAuthor(id);
        this.setState({ user });
    }

    getUserIdeas = (user, ideas) => {
        let userIdeas = [];

        ideas.forEach(idea => {
            if (idea.user === user._id)
                userIdeas.push(idea);
        });

        return userIdeas;
    }

    render() {
        const { user } = this.state;
        const { ideas } = this.props;
        const userIdeas = this.getUserIdeas(user, ideas);
        return (
            <div className="row mt-3">
                <div className="col-lg-3 info">
                    <h4 className="text-center">{user && user.username}</h4>
                    <p className="text-center">{user && user.email}</p>
                </div>
                <div className="col-lg-9">
                    <IdeaList
                        ideas={userIdeas}
                        user={user}
                    />
                </div>
            </div>
         );
    }
}
 
export default User;