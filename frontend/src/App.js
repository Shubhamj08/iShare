import './App.css';
import IdeaList from './components/ideaList';
import Navbar from './components/navbar';
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostIdea from './components/post';
import NotFound from './components/notFound';
import Auth from './components/auth';

class App extends Component {
  

  async componentDidMount() {
    const { data: ideas } = await axios.get('http://localhost:3000/api/ideas');
    this.setState({ ideas });
  }

  state = { 
        ideas: [],
        
    }

  handleLike = (idea) => {
    console.log(idea);
      const ideas = [...this.state.ideas];
      const idx = ideas.indexOf(idea);
      ideas[idx] = { ...ideas[idx] };
      ideas[idx].data.liked = !ideas[idx].data.liked;
      this.setState({ ideas });
    }
    handleShare = (idea) => {
        console.log("Share button clicked", idea);
    }

  render(){
    return(
      <div className="App">
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/post" component={PostIdea}></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/ideas" render={() => <IdeaList
              onLike={this.handleLike}
              onShare={this.handleShare}
              ideas={this.state.ideas} /> }></Route>
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
