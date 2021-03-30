import React, { Component } from 'react';
import Like from './common/like';
import { getIdea } from '../services/ideaService';


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
            <div className="m-5 p-3" style={{border:'2px solid #888888'}}>
                <h4 className="display-4">{idea.title && idea.title.toUpperCase()}</h4>
                <hr/>
                <p className="card-body text-justify" style={{fontSize: "20px", fontFamily:'"Nunito", sans-serif'}}>
                    { idea.description }
                </p>
                <hr/>
                <div>
                    <Like liked={true} onLike={() => {}} />
                    <small className="ml-1">{idea.nLikes}</small>
                </div>
            </div>
         );
    }
}
 
export default FullIdea;