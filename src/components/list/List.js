import React from 'react';
import {handleResponse} from '../../helpers';
import Postlist from './Postlist';
import Loading from '../Loading';
import Categories from './categories/Categories';
import Sublist from './sublist/Sublist';

// WHEN YOU CALL A FUNCTION FROM A PARENT YOU HAVE TO USE THE PARENTHESIS LIKE THIS OR IT DOESN'T WORK
// onClick={()=> eventHandler()}   


class List extends React.Component {
    constructor() {
        super();
        this.state = {
            post: [],
            subs: [],
            error: null,
            loading: false,
            saved: [],
            saveShow: false,
            currentSub: '',
            toComments: '',
        };
        this.eventHandler = this.eventHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.savePost = this.savePost.bind(this);
        this.dontShowSaved = this.dontShowSaved.bind(this);
        this.showSaved = this.showSaved.bind(this);
    }

    componentDidMount() {
        this.fetchData('All','hot');   
    }

    fetchData(sub, categorie){
        this.setState({
            currentSub: sub,
            loading: true,
        });
        
        fetch(`https://www.reddit.com/r/${sub}/${categorie}.json?limit=20&t=month`)
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
    eventHandler(index) {

        //THIS IS THE WAY, NOW FIND A WAY TO PASS THE INDEX IN THE MAP FUNCTION IN POSTLIST!
        const post = this.state.post;
        post[index].saved = !post[index].saved;
        this.setState({
            post,
          })
      }
    
    savePost(toSave, index){
        
        let found = this.state.saved.some( (el) => {
            return el.id === toSave.id;
          });
        if (toSave.saved === true && found === false){ 
            this.state.saved.push(toSave);
            this.setState(
                this.state,
            );
        }else{
            let toRemove = this.state.saved.map((e) => { return e.id; }).indexOf(toSave.id);
            this.state.saved.splice(toRemove, 1);
        }
        
    }
    showSaved(){
        this.setState({
            saveShow: true,
        });
    }
    dontShowSaved(){
        this.setState({
            saveShow: false,
        });
    }

    render() {
        const {error, loading, post, saved, saveShow, currentSub} = this.state;
        if (loading) {
            return <div className = "loading-container" > < Loading /> </div>
        }
        if (error) {
            return <div className = "error" > 
            {error} </div>  
        }
        if (saveShow){
            return (<div>
            <Sublist
                dontShowSaved={this.dontShowSaved}
                fetchData={this.fetchData}
                showSaved={this.showSaved}
                currentSub={currentSub}
            />
            <Postlist 
            post={saved} 
            savePost={this.savePost}
            eventHandler={this.eventHandler} /> 
            </div>)
        }
       
        return ( 
        <div>
            <Sublist
                dontShowSaved={this.dontShowSaved}
                fetchData={this.fetchData}
                showSaved={this.showSaved}
                currentSub={currentSub}
            />
            <Categories 
                fetchData={this.fetchData}
                currentSub={currentSub}
            />
            <Postlist 
            post={post}
            savePost={this.savePost}
            eventHandler={this.eventHandler}
            />
        </div>
        );
    }
}
export default List;