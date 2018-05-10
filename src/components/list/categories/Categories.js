import React from 'react';
import './Categories.css';

// ORGANIZED!

const Categories = (props) => {
    const { resetPage, handleDynamicUrl, currentSub, filters, top } = props;

    return (
        <div>
            <div className="btn-group"> 
                {filters.map((filter, index)=>(
                    <button 
                    key={index}
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => {handleDynamicUrl(currentSub, filter, '', ''); resetPage();}}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Top
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {top.map((top, index)=>(
                    
                        <button key={index}
                            className="dropdown-item" 
                            onClick={() => {handleDynamicUrl(currentSub, 'top', top.code, ''); resetPage();}}
                        >
                            {top.text}
                        </button>
    
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories;

/**
 * 
 * 
 * <button 
                    class="dropdown-item" 
                    onClick={() => {handleDynamicUrl(currentSub, 'top', 'week', ''); resetPage();}}
                >
                    Past week
                </button>
                <button 
                    class="dropdown-item" 
                    onClick={() => {handleDynamicUrl(currentSub, 'top', 'month', ''); resetPage();}}
                >
                    Past month
                </button>
                <button 
                    class="dropdown-item" 
                    onClick={() => {handleDynamicUrl(currentSub, 'top', 'year', ''); resetPage();}}
                >
                    Past year
                </button>
                <button 
                    class="dropdown-item" 
                    onClick={() => {handleDynamicUrl(currentSub, 'top', 'all', ''); resetPage();}}
                >
                    All time
                </button>
 * 
 */