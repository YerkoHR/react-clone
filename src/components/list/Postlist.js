import React from 'react';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom';
import './Postlist.css';
//import Save from './Save';


const Postlist = (props) => {
    const { post, toggle, eventHandler } = props;
    return (
        <div> 
            <div className="list-group">
           
                {post.map((post) => (   
                    
                <div
                    key={post.id} 
                    className="list-group-item list-group-item-light "
 
                > 
                <div className="vote-area">
                    <span >&uarr;</span>
                    <div className="vote-score">{post.score}</div>
                    <span>&darr;</span>
                </div>
                <a className="post-text"
                    href = {post.url}
                    target = "_blank"        
                >
                    {post.title}
                </a>
                <button  onClick={()=> eventHandler() }>{post.saved ? 'Save' : 'Not save'}</button>
            </div>
            ))}
               
           </div>
        </div>
    )

}
//{(event)=> savePost(post.title, post.score, post.url)}
Postlist.propTypes = {
    post: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired,
}

export default Postlist;