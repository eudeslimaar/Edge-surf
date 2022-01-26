import React, { useState } from 'react'
import { auth, db } from '../config/firebase'
import { Link } from 'react-router-dom'

export const SignUp = (props) => {

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // signup
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <div className='container'>
            
            <h2>Sign up</h2>
           
            <form 
                autoComplete="off" 
                className='form-group' 
                onSubmit={signup}
            >
                <label htmlFor="name">Nombre</label>

                <input 
                    type="text" 
                    className='form-control' 
                    required
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                />
               
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    className='form-control' 
                    required
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                />
                <br />
                <label htmlFor="passowrd">Contraseña</label>
                <input 
                    type="password" 
                    className='form-control' 
                    required
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    />
                
                <button 
                    type="submit" 
                    className='btn btn-success btn-md mybtn'
                >
                    Enviar
                </button>
            </form>
            {error && 
                <span className='error-msg'>
                    {error}
                </span>}
            

            <span>Ya tiene cuenta?
                <Link to="login"> Hace click acá</Link>
            </span>
        </div>
    )
}
