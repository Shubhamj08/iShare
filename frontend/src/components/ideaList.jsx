import React, { Component } from 'react';
import Idea from "./idea";

class IdeaList extends Component {

    render() { 
        return (
            <div className="container mt-3 mt-lg-5">
                <div className="row no-gutters">
                    {this.props.ideas && this.props.ideas.map(
                        idea => <Idea
                            key={idea._id}
                            idea={idea}
                            user={this.props.user}
                        />
                    )}
                </div>
            </div>
         );
    }
}
 
export default IdeaList;