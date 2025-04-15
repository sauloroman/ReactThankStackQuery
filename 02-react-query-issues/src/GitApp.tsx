import React from 'react'
import { Outlet } from 'react-router-dom'

export const GitApp: React.FC = () => {
  return (
    <div className='container m-auto max-w-7xl mt-3'>
      <h1>Git Issues &mdash; <small> Seguimiento de problemas</small></h1>
      <Outlet />
    </div>
  )
}
