import React from 'react';
import './Categories.css';

const Categories = (props) => {
    const { fetchData, currentSub } = props;

    return (
        <div className="btn-group"> 
            <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => fetchData(currentSub, 'hot')}
            >
                Hot
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => fetchData(currentSub, 'new')}>New</button>
            <button type="button" className="btn btn-secondary" onClick={() => fetchData(currentSub, 'rising')}>Rising</button>
            <button type="button" className="btn btn-secondary" onClick={() => fetchData(currentSub, 'controversial')}>Controversial</button>
            <button type="button" className="btn btn-secondary" onClick={() => fetchData(currentSub, 'top')}>Top</button>
        </div>
    )
}


export default Categories;