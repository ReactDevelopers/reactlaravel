import React from 'react'
import { Link,NavLink } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <NavLink exact className='navbar-brand' to='/'>Home</NavLink>
    </div>
    <NavLink className='navbar-brand' to='/create'>Login</NavLink>
    <NavLink className='navbar-brand' to='/register'>SignUp</NavLink>
    <NavLink className='navbar-brand' to='/weather'>Weather</NavLink>
    <NavLink className='navbar-brand' to='/MapView'>Map</NavLink>
    <NavLink className='navbar-brand' to='/Forecast'>Forecast</NavLink>
  </nav>
)

export default Header