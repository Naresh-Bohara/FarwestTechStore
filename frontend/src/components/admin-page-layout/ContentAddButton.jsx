import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export const ContentAddButton = ({url, btnText}) => {
  return (
    <><NavLink
    to={url}
    className="flex items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
  >
    <FaPlus className='me-1'/>
    {btnText}
  </NavLink></>
  )
}
