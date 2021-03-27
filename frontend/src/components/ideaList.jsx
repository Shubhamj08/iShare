import React, { Component } from 'react';
import Idea from "./idea";

class IdeaList extends Component {

    render() { 
        return ( 
            <div className="row no-gutters">
                {this.props.ideas.map(
                    idea => <Idea
                        key={idea._id}
                        idea={idea}
                        onLike={() => this.props.onLike(idea)}
                        onShare={() => this.props.onShare(idea)}
                    />
                )}
            </div>
         );
    }
}
 
export default IdeaList;