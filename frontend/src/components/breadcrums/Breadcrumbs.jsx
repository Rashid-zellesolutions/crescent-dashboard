import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({breadcrumbs}) => {
  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((breadcrum, index) => {
        return <span key={index}>
          {index > 0 && <span className='saperator'> / </span>}
          {breadcrum.link ? (
            <Link to={breadcrum.link}>{breadcrum.label}</Link>
          ): (
            <span>{breadcrum.label}</span>
          )}
        </span>
      })}
    </div>
  )
}

export default Breadcrumbs