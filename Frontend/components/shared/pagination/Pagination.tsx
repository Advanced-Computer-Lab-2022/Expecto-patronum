import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

type Props = {
    pageCount: number,
    page: any,
    setPage: any,
    onClick: any,
    getCourses: any,
}

const Pagination = (props: Props) => {
  
    const [pages, setPages] = useState([]);

    useEffect(() => {
        buildPagination(0);
    },[props.pageCount])

    const buildPagination = (pageIndex: number) => {
        global.window.scrollTo(0, 75);
        props.setPage(pageIndex);

        var pagesToDisplay = props.pageCount > 5 ? 5: props.pageCount;

        let newPages = [] as any,
            start = 0,
            end = pagesToDisplay;

        if(pageIndex > (pagesToDisplay - 1) / 2) {
            start = pageIndex - Math.ceil((pagesToDisplay - 1) / 2);
            end = start + pagesToDisplay;
        }

        if(pageIndex > props.pageCount - (pagesToDisplay - 1) / 2) {
            start = props.pageCount - pagesToDisplay;
            end = props.pageCount;
        }

        for(var i = start; i < end; i++) {
            newPages.push(i);
        }

        setPages(newPages);
    }

    return (
    <div className='flex items-center justify-center text-center mb-4'>
        <button className={pageButton + ' '+ ( props.page === 0 ? disabledButton: 'hover:bg-input hover:text-white')} disabled={props.page === 0} onClick={() => buildPagination(0)}><CgPushChevronLeft className='scale-125' /></button>
        {
            pages.map((pageIndex: number) =>(
                <button className={pageButton + ' '+ (pageIndex === props.page ? activeButton: '') + (pageIndex + 1 > props.pageCount ? disabledButton : ' hover:bg-input hover:text-white')} disabled={pageIndex + 1 > props.pageCount} onClick={() => {buildPagination(pageIndex);}} key={pageIndex} type='button'>{ pageIndex + 1 }</button>
            ))
        }
        <button className={pageButton + ' '+ (props.page === props.pageCount - 1 ? disabledButton: '')} disabled={props.page === props.pageCount - 1} onClick={() => buildPagination(props.pageCount - 1)}><CgPushChevronRight className='scale-125' /></button>
    </div>
  )
}

const pageButton = classNames('rounded-md mx-1 w-6 h-6 flex items-center justify-center border-1.5 border-input text-sm');
const activeButton = classNames('bg-input text-white');
const disabledButton = classNames('opacity-50');

export default Pagination;