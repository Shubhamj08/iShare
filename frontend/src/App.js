import './App.css';
import IdeaList from './components/ideaList';
import Navbar from './components/navbar';
import React, { Component } from 'react';

class App extends Component {
  
  state = { 
        ideas: [
            {
                id: 1,
                data: {
                        heading: "Idea 1",
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis magnam amet debitis quasi nemo odio, similique itaque alias vitae exercitationem nulla, nihil aspernatur earum adipisci! At tempore neque esse voluptates!",
                        liked: true
                }
            },
            {
                id: 2,
                data: {
                        heading: "Idea 2",
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis magnam amet debitis quasi nemo odio, similique itaque alias vitae exercitationem nulla, nihil aspernatur earum adipisci! At tempore neque esse voluptates!",
                        liked: false
                }
            },
            {
                id: 3,
                data: {
                        heading: "Idea 3",
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis magnam amet debitis quasi nemo odio, similique itaque alias vitae exercitationem nulla, nihil aspernatur earum adipisci! At tempore neque esse voluptates!",
                        liked: false
                }
            },
            {
                id: 4,
                data: {
                        heading: "Idea 4",
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis magnam amet debitis quasi nemo odio, similique itaque alias vitae exercitationem nulla, nihil aspernatur earum adipisci! At tempore neque esse voluptates!",
                        liked: true
                }
            },
        ],
        
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
          <IdeaList
            onLike={this.handleLike}
            onShare={this.handleShare}
            ideas={this.state.ideas}
          />
        </main>
      </div>
    );
  }

}

export default App;
