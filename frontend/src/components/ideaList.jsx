import React, { Component } from 'react';
import Idea from "./idea";

class IdeaList extends Component {

    showSpinner = () => {
        if (this.props.ideas.length === 0)
            return (
                <div className="spinner-border m-auto text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
    }

    render() { 
        return (
            <div className="container">
                <div className="row no-gutters">
                    {this.showSpinner()}
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