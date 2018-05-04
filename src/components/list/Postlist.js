import React from 'react';
import PropTypes from 'prop-types';
import './Postlist.css';

// ORGANIZED!

const Postlist = (props) => {
    const { post, stateToggleSaved, savePost } = props;

    return ( 
        <div className="container list-group">
           
            {post.map((post, index) => (   
                <div
                    className="list-group-item list-group-item-light"
                    key={post.id} 
                > 
                    <div className="vote-area">
                        <span >&uarr;</span>
                        <div className="vote-score">{post.score}</div>
                        <span>&darr;</span>
                    </div>
                    <div className="post-area">
                        <div className="post-text">
                            <a  
                                className="post-title"    
                                target = "_blank"
                                href = {post.url}       
                            >
                                {post.title}
                            </a>
                        </div>
                    </div>
                    <div className="post-buttons">
            
                        <button  
                            className="post-save btn btn-warning btn-sm" 
                            type="button" 
                            onClick={()=> {stateToggleSaved(index); 
                            savePost(post);}}
                        >   
                            {post.saved ? 'Unsave' : 'Save'}
                        </button>
                        <a 
                            className="post-comments" 
                            href = { "https://reddit.com" + post.permalink } 
                            target = "_blank"
                        >
                            {post.num_comments} Comments
                        </a>
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