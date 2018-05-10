import React from 'react';
import './Sublist.css';

// ORGANIZED!

const Sublist = (props) => {

    const { resetPage, handleDynamicUrl, showSaved, subs, stateToggleForm, toggleForm, handleChange, handleSubmit } = props;

    if (toggleForm){
        return (
            <div className="btn-group button-container " role="group"> 
                <button 
                    className="btn btn-light" 
                    type="button" 
                    onClick={() => {handleDynamicUrl('All', 'hot', ''); 
                    showSaved(false); resetPage();}}
                >   All
                </button>
                <button 
                    className="btn btn-light"
                    type="button" 
                    onClick={() => {handleDynamicUrl('Popular', 'hot', ''); 
                    showSaved(false); resetPage();}}
                >   Popular
                </button>
                <button 
                    className="btn btn-light" 
                    type="button" 
                    onClick={() => showSaved(true)}
                >   Saved
                </button>
                        
                {subs.map((subs, index) => (  
                    <button 
                        className="btn btn-success"
                        key={index}
                        type="button" 
                        onClick={() => {handleDynamicUrl(subs.name, 'hot', ''); 
                        showSaved(false); resetPage();}}
                    >
                        {subs.name}
                    </button>
                ))}

                <button 
                    className="btn btn-danger" 
                    type="button" 
                    onClick={() => stateToggleForm()}
                >   Cancel
                </button>   
                <form 
                    className="form-inline" 
                    onSubmit={(event)=>{handleSubmit(event); 
                    stateToggleForm();}}
                >
                    <div className="input-group">      
                        <input 
                            className="form-control" 
                            placeholder="Add sub.." 
                            type="text" 
                            onChange={(event)=>handleChange(event)}
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-light" type="submit">Add</button>
                        </span>
                    </div>
                </form>
            </div>
   
        )
    }   

    return (
        <div className="btn-group  button-container" role="group">
            <button 
                className="btn btn-light" 
                type="button" 
                onClick={() => {handleDynamicUrl('All', 'hot', ''); 
                showSaved(false); resetPage();}}
            >   All
            </button>
            <button 
                className="btn btn-light" 
                type="button" 
                onClick={() => {handleDynamicUrl('Popular', 'hot', ''); 
                showSaved(false); resetPage();}}
            >   Popular
            </button>
            <button 
                className="btn btn-light"
                type="button" 
                onClick={() => showSaved(true)}
            >   Saved
            </button>
                  
            {subs.map((subs, index) => (  
                <button 
                    className="btn btn-success" 
                    type="button" 
                    key={index}  
                    onClick={() => {handleDynamicUrl(subs.name, 'hot', ''); 
                    showSaved(false); resetPage();}}
                >
                    {subs.name}
                </button>
            ))}

            <button 
                className="btn btn-success" 
                type="button" 
                onClick={() => stateToggleForm()} 
            >
                <i className="material-icons add-sub" >add_circle</i>
            </button>
        </div>  
    )
}


export default Sublist;