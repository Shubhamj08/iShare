import React, { Component } from 'react';
import Idea from "./idea";

class IdeaList extends Component {

    render() { 
        return (
            <div className="container">
                <div className="row no-gutters">
                    {this.props.ideas.map(
                        idea => <Idea
                            key={idea._id}
                            idea={idea}
                            user={this.props.user}
                            onLike={() => this.props.onLike(idea)}
                            onShare={() => this.props.onShare(idea)}
                        />
                    )}
                </div>
            </div>
         );
    }
}
 
export default IdeaList;