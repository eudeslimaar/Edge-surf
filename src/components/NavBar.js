import React, { useContext } from 'react'
import { Icon } from 'react-icons-kit'
import {cart} from 'react-icons-kit/entypo/cart'
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { CartContext } from '../CartContext/CartContext'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({user}) => {

    const history = useNavigate();
    const { totalQty } = useContext(CartContext);

    
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }
    return(
        <div className="navbar">
            <div id='logo'>
                <p>EDGE SURF</p>
            </div>
            <div className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/produtos">Productos</NavLink>
            {!user && <div className='login-area'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user &&<div className='login-area'>
            <span><Link to="/" className='navlink'>{user}</Link></span>
            <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
            <span className='no-of-products'>{totalQty}</span>
                <NavLink to="/signup" >SIGN UP</NavLink>
                <NavLink to="/login" >LOGIN</NavLink>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
            </div>
        </div>
    )
}

export default NavBar