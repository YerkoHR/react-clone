import React from 'react';
import update from 'immutability-helper';
import {handleResponse} from '../../helpers';
import Postlist from './Postlist';
import Loading from '../Loading';
import Categories from './categories/Categories';

// WHEN YOU CALL A FUNCTION FROM A PARENT YOU HAVE TO USE THE PARENTHESIS LIKE THIS OR IT DOESN'T WORK
// onClick={()=> eventHandler()}   


class List extends React.Component {
    constructor() {
        super();
        this.state = {
            post: [],
            error: null,
            loading: false,
            saved: [],
            saveShow: false,
            toggle: true,
        };
        this.eventHandler = this.eventHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.savePost = this.savePost.bind(this);
        this.showSaved = this.showSaved.bind(this);
    }

    componentDidMount() {
        this.fetchData('hot');   
    }

    fetchData(categorie){
        this.setState({
            loading: true,
        });
        fetch(`https://www.reddit.com/r/all/${categorie}.json?limit=10&t=month`)
            .then(handleResponse)
            .then((data) => {
            let post = data.data.children.map((data) => {
                return data.data;
            });
                this.setState({
                    post,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false,
                });
            });    
    }
    eventHandler() {
        //const post = update(this.state.post, {saved: { $apply: function(x) {return !x}}});


        //THIS IS THE WAY, NOW FIND A WAY TO PASS THE INDEX IN THE MAP FUNCTION IN POSTLIST!
        const post = this.state.post;
        post[0].saved = !post[0].saved;
        this.setState({
            post,
          })
        //this.setState((prevState) => {
           //return {tog : !prevState.tog};
          //}
       // );
       
           console.log(!this.state.post[0].saved)
      }
    
    savePost(title, score, url){
        //this.eventHandler();
        this.state.saved.push({
            title,
            score,
            url,
        }); 

        this.setState(
            this.state,
        );
    }
    showSaved(){
        this.setState({
            saveShow: true,
        });
    }

    render() {
        const {error, loading, post, saved, saveShow, toggle} = this.state;
        if (loading) {
            return <div className = "loading-container" > < Loading /> </div>
        }
        if (error) {
            return <div className = "error" > 
            {error} </div>  
        }
        if (saveShow){
            return <Postlist post={saved} saveToggle={this.state.saveToggle} />
        }
        return ( 
        <div>
            <Categories 
            fetchData={this.fetchData}
            showSaved={this.showSaved}
            />
            <Postlist 
            post={post}
            //savePost={this.savePost}
            toggle={toggle}
            eventHandler={this.eventHandler}
            />
        </div>
        );
    }
}
export default List;