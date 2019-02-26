import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Home</Link>
    </div>
    <Link className='navbar-brand' to='create'>Login</Link>
    <Link className='navbar-brand' to='register'>SignUp</Link>
    <Link className='navbar-brand' to='weather'>Weather</Link>
    <Link className='navbar-brand' to='MapView'>Map</Link>
  </nav>
)

export default Header