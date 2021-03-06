import React from 'react'

function Pagination(props){
    const pageNumber = []

    for(let i=1; i<= Math.ceil(props.totalPosts/props.postPerPage); i++){
        pageNumber.push(i);
    }
    
    return (
        <nav>
            <ul className='pagination'>
                {pageNumber.map(number=>(
                    <li key={number} className="page-item"> 
                        <a onClick={() => props.paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination