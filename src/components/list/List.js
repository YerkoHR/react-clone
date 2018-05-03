import React from 'react';
import {handleResponse} from '../../helpers';
import Postlist from './Postlist';
import Loading from '../Loading';
import Categories from './categories/Categories';
import Sublist from './sublist/Sublist';
import Pagination from './pagination/Pagination';
import './List.css';

// WHEN YOU CALL A FUNCTION FROM A PARENT YOU HAVE TO USE THE PARENTHESIS LIKE THIS OR IT DOESN'T WORK
// onClick={()=> eventHandler()}   


class List extends React.Component {
    constructor() {
        super();
        this.state = {
            post: [],
            subs: [],
            value: '',
            error: null,
            loading: false,
            saved: [],
            saveShow: false,
            currentSub: '',
            toComments: '',
            toggleForm: false,
            page: 1,
            totalPages: 50,
            after: '',
            before: '',
            urlFetch: '',
        };
        this.eventHandler = this.eventHandler.bind(this);
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

    fetchData(sub, categorie){

        this.setState({
            loading: true,
            currentSub: sub,
            urlFetch: `https://www.reddit.com/r/${sub}/${categorie}.json?limit=25&t=month&count=25`,
        });
        
        fetch(`https://www.reddit.com/r/${sub}/${categorie}.json?limit=25&t=month&count=25`)
            .then(handleResponse)
            .then((data) => {
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
    showSaved(yesno){
        if (yesno === 'yes'){
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
        const aux = this.state.subs;
        aux.push({name: this.state.value})
        this.setState({subs: aux}); 
        console.log(event)
        event.preventDefault();
        
       
      }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    fetchPagination( direction){
        this.setState({
            loading: true,
        });
        
        let nextPage = this.state.page;
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;


        let  url = this.state.urlFetch;
        url = direction === 'next'? url + '&after=' + this.state.after : url + '&before=' + this.state.before;

        this.setState({page: nextPage }, ()=>{
        fetch(url)
            .then(handleResponse)
            .then((data) => {
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
                });console.log(url)
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false,
                });
            });  })
    }

    render() {
        const {error, loading, post, saved, saveShow, currentSub, subs, toggleForm, value, page, totalPages} = this.state;

        if (loading) {
            return (
                <div> 
                    < Loading /> 
                </div>
            )
        }

        if (error) {
            return (
                <div> 
                    {error} 
                </div>  
            ) 
        }
        if (saveShow){
            return (
                <div>
                    <Sublist
                        value={value}
                        toggleForm={toggleForm} 
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit}          
                        stateToggleForm={this.stateToggleForm}
                        fetchData={this.fetchData}
                        showSaved={this.showSaved}
                        subs={subs}
                    />
                    <Postlist 
                        post={saved} 
                        savePost={this.savePost}
                        eventHandler={this.eventHandler} 
                    /> 
                </div>
            )
        }
       
        return ( 
        <div>
            <div className="container container-sub">
            <Sublist
                handleSubmit={this.handleSubmit}    
                handleChange={this.handleChange}                   
                toggleForm={toggleForm}
                stateToggleForm={this.stateToggleForm}           
                fetchData={this.fetchData}
                showSaved={this.showSaved}
                subs={subs}
            />
            </div>
            <div className="container container-filter">
            <Categories 
                fetchData={this.fetchData}
                currentSub={currentSub}
            /></div>
            <Postlist 
            post={post}
            savePost={this.savePost}
            eventHandler={this.eventHandler}
            />
            <Pagination 
            post={post}
            savePost={this.savePost}
            eventHandler={this.eventHandler}
            page={page}
            totalPages={totalPages}
            fetchPagination={this.fetchPagination}
            />
        </div>
        );
    }
}
export default List;