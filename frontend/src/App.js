import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { apiEndPoint } from './config.json';
import IdeaList from './components/ideaList';
import Navbar from './components/navbar';
import PostIdea from './components/post';
import NotFound from './components/notFound';
import Auth from './components/auth';
import Logout from './components/logout';
import http from './services/httpService';
import { getCurrentUser } from './services/authService';
import './App.css';



class App extends Component {

  async componentDidMount() {
    const { data: ideas } = await http.get(`${apiEndPoint}/ideas`);
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

  handleLike = async (idea) => {
    const originalIdeas = this.state.ideas;
    const ideas = [...this.state.ideas];
    const idx = ideas.indexOf(idea);
    ideas[idx] = { ...ideas[idx] };

    if (!idea.liked) {
      ideas[idx].liked = true;
      this.setState({ ideas });
      try {
        await http.put(`${apiEndPoint}/ideas/like`, idea);
      } catch (ex) {
        this.setState({ originalIdeas });
      }
    } else {
      ideas[idx].liked = false;
      this.setState({ ideas });
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

  render(){
    return(
      <div className="App">
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/post" render={() => <PostIdea
              user = {this.state.user}
            />}></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/ideas" render={() => <IdeaList
              onLike={this.handleLike}
              onShare={this.handleShare}
              ideas={this.state.ideas}
              user={ this.state.user }/>}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="ideas" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }

}

export default App;
