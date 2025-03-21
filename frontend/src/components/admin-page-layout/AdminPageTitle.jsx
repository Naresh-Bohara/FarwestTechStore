import React from 'react'

export const AdminPageTitle = ({pageTitle}) => {
  return (
    <>
     <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        {pageTitle}
      </h1>
    </>
  )
}

