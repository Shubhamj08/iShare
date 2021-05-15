import React, { Component } from 'react';
import Like from './common/like';
import { getIdea } from '../services/ideaService';
import "../css/fullIdea.css"


class FullIdea extends Component {
    state = {
        idea : {}
    }
    
    async componentDidMount() {
        const idea = await getIdea(this.props.match.params._id);
        this.setState({ idea });
    }
    render() {
        const { idea } = this.state;
        return (
            <div className="card m-auto p-5 w-75 full-card bg-dark">
                <h4 className="display-4 text-light">{idea.title && idea.title.toUpperCase()}</h4>
                <hr/>
                <p className="card-body text-light">
                    { idea.description }
                </p>
                <hr/>
                <div>
                    <Like liked={true} onLike={() => {}} />
                    <small className="ml-1 text-light">{idea.nLikes}</small>
                </div>
            </div>
         );
    }
}
 
export default FullIdea;