import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <div className="title">
            <Link to="/" className='link'>
              <h2>OrderApp</h2>
            </Link>
        </div>
        <ul>
            <Link className='link' to="/"><li>Ana səhifə</li></Link>
            <Link className='link' to="makeOrder"><li>Sifariş Et</li></Link>
        </ul>
    </nav>
  )
}

export default Navbar