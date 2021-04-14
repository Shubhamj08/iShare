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
import http from './services/httpService';
import { getCurrentUser } from './services/authService';
import { getIdeas } from './services/ideaService';
import "react-toastify/dist/ReactToastify.css";
import './App.css';



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

  handleLike = async (idea) => {
    const originalIdeas = this.state.ideas;
    const ideas = [...this.state.ideas];
    const idx = ideas.indexOf(idea);
    ideas[idx] = { ...ideas[idx] };

    if (!idea.liked) {
      ideas[idx].liked = true;
      ideas[idx].nLikes += 1;
      this.setState({ ideas });
      try {
        await http.put(`${apiEndPoint}/ideas/like`, idea);
      } catch (ex) {
        this.setState({ originalIdeas });
      }
    } else {
      ideas[idx].liked = false;
      ideas[idx].nLikes -= 1;
      this.setState({ ideas });
      try {
        await http.put(`${apiEndPoint}/ideas/dislike`, idea);
      } catch (ex) {
        this.setState({ originalIdeas });
      }
    }
  }
  
    handleShare = (idea) => {
      navigator.clipboard.writeText(`${idea.title}\n${idea.description}`);
      toast.success("Copied to clipboard");
    }

  render(){
    return (
      <div className="App">
        <ToastContainer/>
        <Navbar user={this.state.user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/ideas/:_id" component={FullIdea}></Route>
            <Route path="/post" render={() => <PostIdea
              user = {this.state.user}
            />}></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/profile" render={() => <Profile user={this.state.user} ideas={this.state.ideas}/>}></Route>
            <Route path="/ideas" render={() => <IdeaList
              onLike={this.handleLike}
              onShare={this.handleShare}
              ideas={this.state.ideas}
              user={ this.state.user }/>}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/ideas" />
            {/* <Route path="/" exact component={Home}></Route> */}
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }

}

export default App;
