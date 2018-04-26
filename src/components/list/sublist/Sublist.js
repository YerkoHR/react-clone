import React from 'react';
//import { withRouter } from 'react-router-dom';
import './Sublist.css';

const Sublist = (props) => {
    const { fetchData, showSaved, currentSub, dontShowSaved } = props;
    return (
        <div> 
            <ul>
                <li>
                    <button onClick={() => {fetchData('All', 'hot'); dontShowSaved();}}>All</button>
                    <button onClick={() => {fetchData('Home', 'hot'); dontShowSaved();}}>Home</button>
                    <button onClick={() => showSaved()}>Saved</button>
                </li>
            </ul>
        </div>
    )

}


export default Sublist;