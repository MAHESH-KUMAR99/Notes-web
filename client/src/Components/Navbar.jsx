import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <nav  className='flex  justify-center p-5 shadow-md gap-10 font-bold'>
            <Link to="/" className=' text-xl text-bold hover:text-gray-800 hover:underline'>Home</Link>
            <Link to ="/create" className='text-xl hover:text-gray-800 hover:underline'> Create-Notes</Link>
        </nav>
    </>
  )
}

export default Navbar
