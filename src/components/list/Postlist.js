import React from 'react';
import PropTypes from 'prop-types';
import './Postlist.css';

// ORGANIZED!

const Postlist = (props) => {
    const { post, stateToggleSaved, savePost } = props;

    return ( 
        <div className=" list-group">
           
            {post.map((post, index) => (   
                <div
                    className="list-group-item list-group-item-light"
                    key={post.id} 
                > 
                    <div className="vote-area">
                        <div>
                            <i className="material-icons up-arrow">arrow_upward</i>
                            </div>        
                        <div className="vote-score">{post.score}</div>
                        <div>
                            <i className="material-icons down-arrow">arrow_downward</i>
                        </div>
                    </div>
                    <div className="post-area">
                        <div className="post-title">
                            <a
                              target = "_blank"
                              href = {post.url}       
                            >
                            {post.title}
                            </a> 
                             <div className="post-details">
                                <a className="detail-item-1" href={"https://www.reddit.com/" + post.subreddit_name_prefixed}> <span className="underlined"> {post.subreddit_name_prefixed}</span></a>
                                <a className="detail-item-2" href={"https://www.reddit.com/user/" + post.author}> Posted by <span className="underlined">{"u/" + post.author}</span></a>
                                <a className="detail-item-3" href={"https://reddit.com" + post.permalink} > <span className="underlined">{post.created_utc}</span></a>
                            </div>
                        </div>
                       
                    </div>
                    <div className="post-buttons">
            
                        <a  
                            className="post-save" 
                            onClick={()=> {stateToggleSaved(post.id); 
                            savePost(post);}}
                        >   
                            {post.saved ? <i class="material-icons save-icon">favorite</i> : <i className="material-icons unsave-icon">favorite_border</i>}
                        </a>
                        <div></div>
                        <div className="post-comments">
                        <i className="material-icons comment-icon">mode_comment</i>
                        <a 
                            href = { "https://reddit.com" + post.permalink } 
                            target = "_blank"
                        > 
                            
                            {post.num_comments}
                        </a>
                        </div>
                    </div>
                </div>
            
            ))}  

        </div>
    )
}
Postlist.propTypes = {
    post: PropTypes.array.isRequired,
    stateToggleSaved: PropTypes.func.isRequired,
}

export default Postlist;

//{post.saved ? 'Unsave' : 'Save'}