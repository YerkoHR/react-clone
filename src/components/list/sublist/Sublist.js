import React from 'react';
import './Sublist.css';

const Sublist = (props) => {

    const { fetchData, showSaved, subs, stateToggleForm, toggleForm, value, handleChange, handleSubmit } = props;

    // MEANWHILE BECAUSE ERROR 503 (SERVER OVERLOAD OR SIMILAR) RIGHT NOW I'M TRYING TO CONDITIONALLY RENDER
    // THE  INPUT USER TO ADD A SUB FROM THIS COMPONENT INSTEAD LIST.JS CURRENTLY USING TOGGLE STATE METHOD.


    // EVERYTHING IS COMPLETLY CLEANLY ORGANIZED NOW WITH THE USUAL REACT/JS SYNTAX 
    // I'M TRYNG TO FOLLOW AN ORDER OF CLASS FIRST TO MAKE STYLING EASIER, DATA DETAILS IN MIDDLE AND FUNCTIONS LAST
    // ALSO ONE SPACE BETWEEN FIRST COST DEFINITION IN THE COMPONENT AND THE LOOP INSIDE THE RENDERING.

    // TO DO! CHECK WHAT I REALLY NEED IN TERMS OF FUNCTIONS AND PROPS. 
    // FOR THE FINAL TOUCHE ADD COMMENTS ABOUT WHAT ARE YOU DOING.

    if (toggleForm){
        return (
            <div className="btn-group button-container " role="group"> 
                <button 
                    className="btn btn-light" 
                    type="button" 
                    onClick={() => {fetchData('All', 'hot'); 
                    showSaved('no');}}
                >   All
                </button>
                <button 
                    className="btn btn-light"
                    type="button" 
                    onClick={() => {fetchData('Home', 'hot'); 
                    showSaved('no');}}
                >   Home
                </button>
                <button 
                    className="btn btn-light" 
                    type="button" 
                    onClick={() => showSaved('yes')}
                >   Saved
                </button>
                        
                {subs.map((subs, index) => (  
                    <button 
                        className="btn btn-success"
                        key={index}
                        type="button" 
                        onClick={() => fetchData(subs.name, 'hot')}
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
                            value={value} 
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
                onClick={() => {fetchData('All', 'hot'); 
                showSaved('no');}}
            >   All
            </button>
            <button 
                className="btn btn-light" 
                type="button" 
                onClick={() => {fetchData('Home', 'hot'); 
                showSaved('no');}}
            >   Home
            </button>
            <button 
                className="btn btn-light"
                type="button" 
                onClick={() => showSaved('yes')}
            >   Saved
            </button>
                  
            {subs.map((subs, index) => (  
                <button 
                    className="btn btn-success" 
                    type="button" 
                    key={index}  
                    onClick={() => fetchData(subs.name, 'hot')}
                >
                    {subs.name}
                </button>
            ))}

            <button 
                className="btn btn-success" 
                type="button" 
                onClick={() => stateToggleForm()} 
            >
                <i className="material-icons" >add_circle</i>
            </button>
        </div>  
    )
}


export default Sublist;