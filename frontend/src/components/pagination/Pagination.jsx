import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const ShowingInfo = ({total=0, limit=10, currentPage=1}) => {
    let start = ((currentPage-1)*limit)+1;
    let totalPages = Math.ceil(total/limit);
    let lastValue = 0;
    if((currentPage==1 && totalPages==1) || (totalPages==currentPage)){
        lastValue=total;
    }else{
        lastValue = (currentPage * limit)
    }
  return (
    <>
    <span className="text-sm  font-normal text-gray-500 dark:text-gray-400">
                Showing &nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                  {start}-{lastValue} &nbsp;
                </span>
                of &nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                  {total}
                </span>
              </span>
    </>
  )
}

export const PaginationComponent = ({pagination, loadData})=>{
    return (
        <>
        <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <ShowingInfo total={pagination.totalData} limit={pagination.limit} currentPage={pagination.currentPage} />
              <ul className="inline-flex items-stretch -space-x-px">
            {
              pagination.currentPage > 1 &&     <li>
              <a
                onClick={async (e)=>{
                  e.preventDefault()
                  await loadData({page: pagination.currentPage - 1})
                }}
                className="flex hover:cursor-pointer items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
              <FaAngleLeft/>
              </a>
            </li>
            }
                {
                  [...new Array(pagination.totalPages)].map((_, ind)=>(
                    <li key={ind}>
                  <a
                     onClick={async (e)=>{
                      e.preventDefault()
                      await loadData({page: ind+1})
                    }}
                    className="flex hover:cursor-pointer items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {ind+1}
                  </a>
                </li>
                  ))
                }
                
               {
                pagination.currentPage !== pagination.totalPages &&  <li>
                <a
                   onClick={async (e)=>{
                    e.preventDefault()
                    await loadData({page: (+pagination.currentPage + 1)})
                  }}
                  className="flex hover:cursor-pointer items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                 <FaAngleRight/>
                </a>
              </li>
               }
              </ul>
            </nav>
        </>
    )
}