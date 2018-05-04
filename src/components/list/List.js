import React from 'react';
import {handleResponse} from '../../helpers';
import Postlist from './Postlist';
import Loading from '../Loading';
import Categories from './categories/Categories';
import Sublist from './sublist/Sublist';
import Pagination from './pagination/Pagination';
import './List.css';

// WHEN YOU CALL A FUNCTION FROM A PARENT YOU HAVE TO USE THE PARENTHESIS LIKE THIS OR IT DOESN'T WORK
// onClick={()=> stateToggleSaved()}   


// ORGANIZED!

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            post: [],
            subs: [],
            userInput: '',
            loading: false,
            saved: [], // Store saved posts.
            saveShow: false, // State to show or don't save posts, since it's the only not fetched data here.
            currentSub: '', // State to apply filter.
            toggleForm: false, 
            filters: [ 'hot', 'new', 'rising', 'controversial', 'top' ],
            page: 1, //  ------> everything from here to evaluate!
            totalPages: 50,
            after: '',
            before: '',
            urlFetch: '',
        };
        this.stateToggleSaved = this.stateToggleSaved.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.savePost = this.savePost.bind(this);
        this.showSaved = this.showSaved.bind(this);
        this.stateToggleForm= this.stateToggleForm.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.fetchPagination= this.fetchPagination.bind(this);
    }

    componentDidMount() {
        this.fetchData('All','hot');   
    }
    fetchData(sub, filter){

        let urlFetch = `https://www.reddit.com/r/${sub}/${filter}.json?limit=25&t=month&count=25`;
        
        this.setState({
            loading: true,
            currentSub: sub,
            urlFetch,
        }, () => {
            fetch(this.state.urlFetch).then(handleResponse).then((data) => {
                let after = data.data.after;
                let before = data.data.before;
                let post = data.data.children.map((data) => {
                    return data.data;
                });
                this.setState({
                    post,
                    after,
                    before,
                    loading: false,
                }); 
            });
        });   
    }
    stateToggleSaved(index) {
        const post = this.state.post;
        post[index].saved = !post[index].saved;

        this.setState({
            post,
        });
    }
    savePost(postToSave){
        // Check if post is stored in saved array return true if found.

        let found = this.state.saved.some((post) => {
            return post.id === postToSave.id;
          });

        // of the saved state in the post to store is true and is not repeated
        // push it to saved array.

        if ((postToSave.saved) && (!found)){ 
            this.state.saved.push(postToSave);
        }else{

            // Search id of post and ask for index, then remove from saved array.

            let toRemove = this.state.saved.map((toRemove) => { 
                return toRemove.id; 
            }).indexOf(postToSave.id);
            this.state.saved.splice(toRemove, 1);
        }  
    }
    showSaved(condition){
        if (condition){
            this.setState({
                saveShow: true,
            });
        }else{
            this.setState({
                saveShow: false,
            });
        }
    }
    stateToggleForm(){
        let toggleForm = this.state.toggleForm;
        toggleForm = !this.state.toggleForm;
        this.setState({
            toggleForm,
        })
    }
    handleSubmit(event) {
        const subs = this.state.subs;

        subs.push({
            name: this.state.userInput,
        });

        this.setState({
            subs,
        }); 

        event.preventDefault();
    }
    handleChange(event) {

        this.setState({
            userInput: event.target.value,
        });
    }
    fetchPagination(direction){

        this.setState({
            loading: true,
        });
        
        // this manages display of page number.

        let nextPage = this.state.page;
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        // local varible to add after or before code into url to fetch next or previous page.

        let  urlPage = this.state.urlFetch;
        urlPage = direction === 'next'? urlPage + '&after=' + this.state.after : urlPage + '&before=' + this.state.before;

        // THIS COULD BE FIXED TO FOLLOW D.R.Y BUT FOR NOW TBD!

        this.setState({
            page: nextPage,
        }, () => {
            fetch(urlPage).then(handleResponse).then((data) => {
                let after = data.data.after;
                let before = data.data.before;
                let post = data.data.children.map((data) => {
                    return data.data;
                });
                this.setState({
                    post,
                    after,
                    before,
                    loading: false,
                });
            });
        });
    }

    render() {
        const { loading, filters, post, saved, saveShow, currentSub, subs, toggleForm, page, totalPages } = this.state;

        if (loading) {
            return (
                <div> 
                    < Loading /> 
                </div>
            )
        }

        if (saveShow){
            return (
                <div className="container container-sub">
                    <Sublist
                        subs={subs}
                        toggleForm={toggleForm} 
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit}          
                        stateToggleForm={this.stateToggleForm}
                        fetchData={this.fetchData}
                        showSaved={this.showSaved}
                    />
                    <Postlist 
                        post={saved} 
                        savePost={this.savePost}
                        stateToggleSaved={this.stateToggleSaved} 
                    /> 
                </div>
            )
        }
       
        return ( 
            <div>
                <div className="container container-sub">
                    <Sublist
                        subs={subs}
                        toggleForm={toggleForm}
                        handleSubmit={this.handleSubmit}    
                        handleChange={this.handleChange}                   
                        stateToggleForm={this.stateToggleForm}           
                        fetchData={this.fetchData}
                        showSaved={this.showSaved}
                    />
                </div>
                <div className="container container-filter">
                    <Categories 
                        currentSub={currentSub}
                        filters={filters}
                        fetchData={this.fetchData}
                    />
                </div>
                <Postlist 
                    post={post}
                    savePost={this.savePost}
                    stateToggleSaved={this.stateToggleSaved}
                />
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    fetchPagination={this.fetchPagination}
                />
            </div>
        );
    }
}

export default List;