import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/idea.css";
import { likeIdea } from '../services/ideaService';
import Like from './common/like';
import Share from './common/share';
import { toast } from 'react-toastify';
import { getAuthor } from '../services/userService';
import { getCurrentUser } from './../services/authService';


class Idea extends Component {
    constructor() {
        super();
        this.state = {
            author:{},
            idea: {
                title: "",
                description: "",
                liked: false,
                nLikes: 0,
            }
        };
    }

    componentDidMount = async () => {
        const { idea } = this.props;
        let author = this.state.author;
        if (!author.username) {
            author = await getAuthor(idea.user);
            this.setState({ author, idea });
        } else {
            this.setState({ idea });
        }
    }

    handleLike = async () => {
        let idea = this.state.idea;
        if (!idea.liked) {
            idea.liked = true;
            idea.nLikes += 1;
        } else {
            idea.liked = false;
            idea.nLikes -= 1;
        }
        this.setState({ idea });
        await likeIdea(this.state.idea);
    }

    handleShare = () => {
        const { idea } = this.state;
        navigator.clipboard.writeText(`${idea['title']}\n${idea['description']}`);
        toast.success("Copied To Clipboard");
    }

    render() {
        const { author, idea } = this.state;
        const currUser = getCurrentUser();
        return (
            <div className="col-lg-6">
                <div className="card card-idea m-3">
                    <div className="card-header pb-0 d-flex justify-content-between">
                        <Link to={`/ideas/${idea._id}`}>{idea.title.toUpperCase()}</Link>
                        {currUser && currUser._id === author._id &&
                            <Link to={`/post/${idea._id}`}><i className="fa fa-edit"></i></Link>
                        }
                    </div>
                    <div className="card-body">
                        <div className="card-text">{idea.description}</div>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <Link to={`/user/${idea.user}`}><small>{author.username}</small></Link>
                        <div>
                        <Like liked={idea.liked} onLike={this.handleLike} />
                        <small className="ml-1">{idea.nLikes > 0? idea.nLikes:""}</small>
                        <Share onShare={this.handleShare} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Idea;