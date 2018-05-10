import React from 'react';
import moment from 'moment';
import {handleResponse} from '../../helpers';
import Postlist from './Postlist';
import Loading from '../Loading';
import Categories from './categories/Categories';
import Sublist from './sublist/Sublist';
import Pagination from './pagination/Pagination';
import './List.css';

// ORGANIZED!

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            post: [],
            subs: [],
            userInput: '',
            loading: false,
            saved: [], 
            saveShow: false, 
            currentSub: '', 
            toggleForm: false, 
            filters: [ 'hot', 'new', 'rising', 'controversial'],
            page: 1, 
            totalPages: 50,
            after: '',
            before: '',
            paginationFix: '',
            currentFilter: '',
            top: [
                { text: 'Past hour', code:'hour'},
                { text: 'Past 24 hours', code:'day'}, 
                { text: 'Past week', code:'week'}, 
                { text: 'Past month', code:'month'}, 
                { text: 'Past year', code:'year'}, 
                { text: 'Past year', code:'all'} 
            ],
            currentTop: '',
            
        };
        this.stateToggleSaved = this.stateToggleSaved.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.savePost = this.savePost.bind(this);
        this.showSaved = this.showSaved.bind(this);
        this.stateToggleForm= this.stateToggleForm.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.fetchPagination= this.fetchPagination.bind(this);
        this.handleDynamicUrl=this.handleDynamicUrl.bind(this);
        this.resetPage=this.resetPage.bind(this);
    }

    componentDidMount() {
        this.handleDynamicUrl('All','hot', '');   
    }
    handleDynamicUrl(currentSub, currentFilter , currentTop, paginationFix){

        this.setState({
            currentFilter,
            currentSub,
            paginationFix,
            currentTop,
        }, () => {
            this.fetchData();
        });
    }
    resetPage(){
        this.setState({
            page: 1,
        });
    }
    afterRenderSavedFix(){
        let saved = this.state.saved;
        let post = this.state.post;

        post.forEach((x)=>{
            saved.forEach((y)=>{
                if (x.id === y.id){
                    x.saved = y.saved;
                }
            });
        });
        this.setState({
            saved,
            post,
        });
        
    }
    fetchData(){
        let urlFetch = 'https://www.reddit.com/r/' + this.state.currentSub + '/' + this.state.currentFilter + '.json?limit=25&t=' + this.state.currentTop + '&count=25' + this.state.paginationFix;
        
        this.setState({
            loading: true,
        }, () => {
            fetch(urlFetch).then(handleResponse).then((data) => {
                let after = data.data.after;
                let before = data.data.before;
                let post = data.data.children.map((data) => {
                    return data.data;
                });
                this.setState({
                    post,
                    before,
                    after,
                    loading: false,
                },()=>{this.afterRenderSavedFix(); this.kFormatter(); this.timeAgoFix();}); 
            });
        });   
    }
    stateToggleSaved(id) {
        let post = this.state.post;
        post.forEach((element) => {
            if (element.id === id){
                element.saved = !element.saved;
            }
        });

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
        
        // this manages display of page kber.

        let nextPage = this.state.page;
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        let  urlPage = direction === 'next'? '&after=' + this.state.after : '&before=' + this.state.before;

        this.setState({
            page: nextPage, 
            paginationFix: urlPage,
        }, () => {
           this.handleDynamicUrl(this.state.currentSub, this.state.currentFilter, urlPage);
        });
    }
    kFormatter(){
        let k = this.state.post;

        k.forEach((x)=>{
            x.score =  x.score>1000 ? (x.score / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : x.score;
            x.num_comments =  x.num_comments>1000 ? (x.num_comments / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : x.num_comments;
        
        });
        
        this.setState({
            post: k,
        });
    }
    timeAgoFix() {
        let newTime = this.state.post;
        newTime.forEach((x)=>{
            x.created_utc = moment.unix(x.created_utc).fromNow();
        });
        this.setState({
            post:newTime,
        });
        
    }

    render() {
        const { loading, top, filters, post, saved, saveShow, currentSub, subs, toggleForm, page, totalPages } = this.state;

        if (loading) {
            return (
                <div> 
                    < Loading /> 
                </div>
            )
        }

        if (saveShow){
            if(saved.length>0){
                return (
                    <div className="container container-sub">
                        <Sublist
                            subs={subs}
                            toggleForm={toggleForm} 
                            handleChange={this.handleChange} 
                            handleSubmit={this.handleSubmit}          
                            stateToggleForm={this.stateToggleForm}
                            handleDynamicUrl={this.handleDynamicUrl}
                            showSaved={this.showSaved}
                            resetPage={this.resetPage}
                        />
                        <Postlist 
                            post={saved} 
                            savePost={this.savePost}
                            stateToggleSaved={this.stateToggleSaved} 
                        /> 
                    </div>
                )
            }else{
                return (
                <div className="container container-sub"> 
                     <Sublist
                            subs={subs}
                            toggleForm={toggleForm} 
                            handleChange={this.handleChange} 
                            handleSubmit={this.handleSubmit}          
                            stateToggleForm={this.stateToggleForm}
                            handleDynamicUrl={this.handleDynamicUrl}
                            showSaved={this.showSaved}
                            resetPage={this.resetPage}
                        />
                     <div className="container">No posts saved </div> 
                </div>
            )
            }
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
                        handleDynamicUrl={this.handleDynamicUrl}
                        showSaved={this.showSaved}
                        resetPage={this.resetPage}
                    />
                </div>
                <div className="container container-filter">
                    <Categories 
                        currentSub={currentSub}
                        filters={filters}
                        top={top}
                        handleDynamicUrl={this.handleDynamicUrl}
                        resetPage={this.resetPage}
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
                    handleDynamicUrl={this.handleDynamicUrl}
                />
            </div>
        );
    }
}

export default List;