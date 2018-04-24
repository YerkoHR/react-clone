import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list/List';
import './index.css';

// This is where all the components will be organized, not everything
// just the main parts, you can render a component inside another component
// like in the last project (Search inside Header).
// Also later we manage the main router functionalities.

const App = () => {

    return (
        <div>
           <List />
        </div>
    );
}

// This injects the above rendered code in index.html 
// (index.html remains untouched except for css libraries)

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
