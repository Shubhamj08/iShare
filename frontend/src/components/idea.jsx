import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/idea.css";
import Like from './common/like';
import Share from './common/share';


class Idea extends Component {
    render() {
        var { idea } = this.props;
        return (
            <div className="col-sm-6">
                <div className="card m-3">
                    <div className="card-header pb-0 bg-white text-left">
                        <Link to={`/ideas/${idea._id}`} className="card-title">{ idea.title && idea.title.toUpperCase() }</Link>
                    </div>
                    <div className="card-body text-justify">
                        <div className="card-text">{ idea.description }</div>
                    </div>
                    <div className="card-footer bg-white text-right">
                        <Like liked={this.props.idea.liked} onLike={this.props.onLike} />
                        <small className="ml-1">{this.props.idea.nLikes > 0? this.props.idea.nLikes:""}</small>
                        <Share onShare={ this.props.onShare }/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Idea;