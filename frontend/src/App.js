import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { apiEndPoint } from './config.json';
import { ToastContainer, toast } from 'react-toastify';
import IdeaList from './components/ideaList';
import Navbar from './components/navbar';
import PostIdea from './components/post';
import NotFound from './components/notFound';
import Auth from './components/auth';
import Logout from './components/logout';
import Profile from './components/profile';
import Home from './components/home';
import FullIdea from './components/fullIdea';
import { getCurrentUser } from './services/authService';
import { getIdeas } from './services/ideaService';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import User from './components/user';



class App extends Component {

  async componentDidMount() {
    const ideas = await getIdeas();
    const user = getCurrentUser();
    ideas.forEach(idea => {
      if (user) {
        if (idea.likes.includes(user._id)) {
          idea.liked = true;
        }
      }
    });
    this.setState({ ideas, user });
  }

  state = { 
        ideas: [],
    }

  render(){
    return (
      <div className="App bg-white">
        <ToastContainer/>
        <Navbar user={this.state.user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/ideas/:_id" render={ (props) =>
              <FullIdea ideas={this.state.ideas} {...props}/>
            }></Route>
            <Route path="/user/:_id" render={(props) =>
              <User ideas={this.state.ideas} {...props} />
            }></Route>
            <Route path="/post/:_id" render={(props) => <PostIdea
              user={this.state.user}
              ideas={this.state.ideas}
              {...props}
            />}></Route>
            <Route path="/post" render={() => <PostIdea
              user = {this.state.user}
            />}></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/profile" render={() => <Profile
              user={this.state.user}
              ideas={this.state.ideas}/>}></Route>
            <Route path="/ideas" render={() => <IdeaList
              ideas={this.state.ideas}
              user={this.state.user} />}></Route>
            <Route path="/home" render={() =>
              <Home user={ this.state.user }/>
            }></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }

}

export default App;
