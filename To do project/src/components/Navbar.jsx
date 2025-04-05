import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex sticky top-0 shadow-md z-50 justify-between bg-blue-800 text-white px-8 py-4'>


      <div className='logo '>
        <span className='font-bold text-2xl mx-8 text-amber-300 py-1'>iTast</span>
      </div>
      <ul className='flex gap-8 mx-16'>
        <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-200'>Task</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-200'>Profile</li>
      </ul>
    </nav>
  )
}

export default Navbar