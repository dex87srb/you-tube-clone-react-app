import { useState, useEffect } from 'react'
import React from 'react'
import uuid from 'react-uuid'


function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
    //const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        window.scrollTo({ behavior: 'smooth', top: '63' });
    }, [currentPage]);


    const videoUpdate = React.useRef(false);

    React.useEffect(() => {
        if (!videoUpdate.current) {
            setCurrentPage((page) => page = 1);
        }
    }, [data, setCurrentPage]);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }


    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;

        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {


        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        let pageLim = data.length / 10
        let remain = pageLim;
        let remainFifty = data.length;

        while (remain > 5) {
            remain -= 5
        }

        while (remainFifty >= 50) {
            remainFifty -= 50
        }

        let dataPassByOne = data.length - remainFifty

        if (remain < 5 && remain > 0 && remainFifty > 0 && start === Math.floor(dataPassByOne / 10)) {

            if (Number.isInteger(remain)) {
                return new Array(remain).fill().map((_, idx) => start + idx + 1)
            } else
                return new Array(Math.floor(remain) + 1).fill().map((_, idx) => start + idx + 1)
        }

        else
            return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
    };

    return (
        <div className='Container'>


            {/* show the posts, 10 posts at a time */}
            <div className="dataContainer" >
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={uuid()} data={d} />
                ))}
            </div>

            {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
            <div className="pagination">

                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    id='previous'
                    className={`prev ${currentPage === 1 ? 'display' : ''}`}
                >
                    <i className='arrow left'></i>
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    id='next'
                    className={`next ${currentPage === (Number.isInteger(data.length / dataLimit) ? data.length / dataLimit : Math.floor(data.length / dataLimit) + 1) || (currentPage === 1 && data.length <= 10) ? 'display' : ''}`}
                >
                    <i className='arrow right'></i>
                </button>
            </div>
        </div>
    );
}

export default Pagination;