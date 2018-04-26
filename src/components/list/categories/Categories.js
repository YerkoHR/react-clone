import React from 'react';
//import { withRouter } from 'react-router-dom';
import './Categories.css';

const Categories = (props) => {
    const { fetchData, currentSub } = props;
    return (
        <div> 
            <ul>
                <li>
                    <button onClick={() => fetchData(currentSub, 'hot')}>Hot</button>
                    <button onClick={() => fetchData(currentSub, 'new')}>New</button>
                    <button onClick={() => fetchData(currentSub, 'rising')}>Rising</button>
                    <button onClick={() => fetchData(currentSub, 'controversial')}>Controversial</button>
                    <button onClick={() => fetchData(currentSub, 'top')}>Top</button>
                </li>
            </ul>
        </div>
    )

}


export default Categories;