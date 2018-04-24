import React from 'react';
//import { withRouter } from 'react-router-dom';
import './Categories.css';

const Categories = (props) => {
    const { fetchData, showSaved } = props;
    return (
        <div> 
            <ul>
                <li>
                    <button onClick={() => fetchData('hot')}>Hot</button>
                    <button onClick={() => fetchData('new')}>New</button>
                    <button onClick={() => fetchData('rising')}>Rising</button>
                    <button onClick={() => fetchData('controversial')}>Controversial</button>
                    <button onClick={() => fetchData('top')}>Top</button>
                    <button onClick={() => showSaved()}>Saved</button>
                </li>
            </ul>
        </div>
    )

}


export default Categories;