import React from 'react';

const Share = (props) => {
    return ( 
        <i
            className="fa fa-share mx-3"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={props.onShare}
        >
        </i>
     );
}
 
export default Share;