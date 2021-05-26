import React, { Component } from 'react';
import IdeaList from './ideaList';
import '../css/profile.css';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import ChangePass from './changePass';
import ChangeName from './changeName';

class Profile extends Component {

    getLikedIdeas = (user, ideas) => {
        let likedIdeas = [];
        ideas.forEach(idea => {
            if (idea.likes.includes(user._id)) {
                likedIdeas.push(idea);
            }
        });
        return likedIdeas;
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
        const { user, ideas } = this.props;
        const userIdeas = this.getUserIdeas(user, ideas);
        const likedIdeas = this.getLikedIdeas(user, ideas);
        return (
            <div className="row mt-3">
                <div className="col-lg-3 info">
                    <h4 className="text-center">{user && user.username}</h4>
                    <p className="text-center">{user && user.email}</p>

                    <div className="navbar">
                        <div className="navbar-nav text-center mb-3" style={{width: '100%'}}>
                            <NavLink className="nav-item nav-link text-dark" to="/profile/yourideas">Your Ideas</NavLink>
                            <NavLink className="nav-item nav-link text-dark" to="/profile/likedideas">Ideas You've Liked</NavLink>
                            <NavLink className="nav-item nav-link text-dark" to="/profile/changepassword">Change Password</NavLink>
                            <NavLink  className="nav-item nav-link text-dark" to="/profile/changename">Change Username</NavLink>
                        </div>
                    </div>

                </div>
                <div className="col-lg-9">
                    <Switch>
                        <Route path="/profile/yourideas" render = { () =>
                            <IdeaList ideas={userIdeas} user={user} />
                        } ></Route>
                        <Route path="/profile/likedideas" render = { () =>
                            <IdeaList ideas={likedIdeas} user={user} />
                        } ></Route>
                        <Route path="/profile/changepassword" component={ChangePass}></Route>
                        <Route path="/profile/changename" component={ChangeName}></Route>
                        <Redirect from="/profile" exact to="/profile/yourideas" />
                    </Switch>
                    {/* <h4>Your Ideas</h4>
                    <IdeaList
                        ideas={userIdeas}
                        user={user}
                    />

                    <hr className="mb-5" />
                    <h4>Ideas that you liked!</h4>
                    <IdeaList
                        ideas={likedIdeas}
                        user={user}
                    /> */}
                </div>
            </div>

         );
    }
}
 
export default Profile;