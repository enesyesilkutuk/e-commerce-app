import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
    const dispatch = useDispatch();
    const { numOfPages, page } = useSelector((store) => store.allJobs);
    const pages = Array.from({ length: numOfPages }, (_,index) => {
        return index + 1;
    });
    const nextPage = () => {console.log("next")};
    const prevPage = () => {console.log("prev")};
  return (
    <Wrapper>
    <button type="button"className='prev-btn' onClick={prevPage}><HiChevronDoubleLeft />previous</button>
    <div className="btn-container">
    { pages.map((pageNumber) => {
        return (
            <button key={pageNumber} type="button" onClick={() =>console.log("hello")} className={pageNumber === page ? "pageBtn active" : "pageBtn"}>{pageNumber}</button>
        )
    })}
    </div>
    <button type="button"className='next-btn' onClick={nextPage}>next<HiChevronDoubleRight /></button>
    </Wrapper>
  )
}

export default PageBtnContainer;