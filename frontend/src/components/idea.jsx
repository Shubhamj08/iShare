import React, { Component } from 'react';
import "../css/idea.css";
import Like from './common/like';
import Share from './common/share';


class Idea extends Component {

    render() { 
        var { data } = this.props;
        return (
            <div className="col-sm-6">
                <div className="card m-3">
                    <div className="card-header pb-0 bg-white text-left">
                        <div className="card-title">{ data.heading }</div>
                    </div>
                    <div className="card-body text-justify">
                        <div className="card-text">{ data.text }</div>
                    </div>
                    <div className="card-footer bg-white text-right">
                        <Like liked={data.liked} onLike={ this.props.onLike }/>
                        <Share onShare={ this.props.onShare }/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Idea;