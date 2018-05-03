import React from 'react';

const Pagination = (props) => {
    const {fetchPagination, page, totalPages} = props;

    return (
        <div>
            <button
                onClick={() => fetchPagination('prev')} 
                disabled={page <= 1}
            >
                &larr;
            </button>
            <span>
                page <b>{page}</b> of <b>{totalPages}</b>
            </span>
            <button
                onClick={() => fetchPagination('next')}
                disabled={page >= totalPages}
            >
                &rarr;
            </button>
        </div>
    );

}

export default Pagination;