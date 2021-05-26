import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../css/home.css';
import { Redirect, Link } from 'react-router-dom';

const Home = (props) => {

    const [profile, setProfile] = useState(false);
    const handleProfileClick = () => {
        if (props.user)
            setProfile(true);
        else {
            setProfile(false);
            toast.warning("You Need To Login First");
        }
    }

    return (
        <div>
            <div className="row align-items-center pt-2 pt-md-5">
                <Link to="/ideas" style={{textDecoration: "none"}} className="first-col text-dark pb-5 col-lg-6" >
                    <div className="card p-0 idea-card mx-auto">
                        <div className="card-header pb-0 d-flex justify-content-between">
                            <h6>TITLE</h6>
                            <i className="fa fa-edit"></i>
                        </div>
                        <div className="card-body">
                            <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, dignissimos sequi. Sapiente, adipisci exercitationem neque sit dolores provident illum iusto in officiis est ex, velit eum quae sed autem vero!</div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <small>Author</small>
                            <div>
                                <i className="fa fa-heart"></i>
                                <small className="ml-1">10M</small>
                                <i className="fa fa-copy mx-3"></i>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3 px-5"><span className="py-2 px-3 goto-ideas">See Ideas</span></div>
                </Link>
                <Link to="post" style={{textDecoration: "none"}} className="second-col text-dark pb-5 col-lg-6">
                    <div className="card mx-auto post-card">
                        <img src="/post-image.png" style={{maxHeight: "100%"}} alt="postImage" />
                    </div>
                    <div className="text-center mt-3 px-5"><span className="py-2 px-3 goto-post">Post an Idea</span></div>
                </Link>
            </div>

            <div className="row align-items-center">
                <div className="first-col pb-5 mx-auto col-lg-6" onClick={handleProfileClick}>
                    <div className="card mx-auto profile-card">
                        <img src="/profile-image.png" alt="postImage" />
                    </div>
                    <div className="text-center mt-3 px-5"><span className="py-2 px-3 goto-profile">Profile</span></div>
                </div>
                {profile && <Redirect to="/profile"/>}
            </div>
        </div>
     );
}
 
export default Home;