import React from 'react';
import './Categories.css';

// ORGANIZED!

const Categories = (props) => {
    const { fetchData, currentSub, filters } = props;

    return (
        <div className="btn-group"> 
            {filters.map((x, index)=>(
                <button 
                key={index}
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => fetchData(currentSub, x)}
                >
                    {x}
                </button>
            ))}
        </div>
    )
}

export default Categories;