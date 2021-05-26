import React, { Component } from 'react';
import Like from './common/like';
import "../css/fullIdea.css"


class FullIdea extends Component {

    getIdea = (props) =>{
        const { _id: id } = props.match.params;
        const { ideas } = props;
        return ideas.find(idea => { return idea._id === id });
    }

    render() {
        const idea = this.getIdea(this.props);
        return (
            <div className="card mx-auto mt-3 mt-md-5 p-5 w-75 full-card bg-white">
                <h4 className="display-4 text-dark">{idea && idea.title.toUpperCase()}</h4>
                <hr/>
                <p className="card-body text-dark">
                    {idea && idea.description }
                </p>
                <hr/>
                <div>
                    <Like liked={true} onLike={() => {}} />
                    <small className="ml-1 text-dark">{idea && idea.nLikes}</small>
                </div>
            </div>
         );
    }
}
 
export default FullIdea;