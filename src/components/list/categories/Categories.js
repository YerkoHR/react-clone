import React from 'react';
import './Categories.css';

// ORGANIZED!

const Categories = (props) => {
    const { handleDynamicUrl, currentSub, filters } = props;

    return (
        <div className="btn-group"> 
            {filters.map((filter, index)=>(
                <button 
                key={index}
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => handleDynamicUrl(currentSub, filter, '')}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

export default Categories;