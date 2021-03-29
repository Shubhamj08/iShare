import React from 'react';
import Like from './common/like';

const FullIdea = (props) => {
    var { idea } = props;
        return (
                <div className="m-5">
                    <h4 className="display-4">{ idea.title && idea.title.toUpperCase() }</h4>
                    <p className="card-body text-justify">
                        { idea.description }
                    </p>
                    <div>
                        <Like liked={true} onLike={() => {}} />
                        <small className="ml-1">{props.idea.nLikes}</small>
                    </div>
                </div>
        );
}
 
export default FullIdea;