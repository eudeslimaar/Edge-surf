import NavBar from './components/NavBar';
import React, { Component } from 'react'
import Home from './components/Home'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProducts from './components/AddProducts/AddProducts'
import { CartContextProvider } from './CartContext/CartContext';
import { ProductsContextProvider } from './CartContext/ProductsContext';
import  {SignUp} from './components/SignUp'
import  {Login}  from './components/Login'
import {auth, db} from './config/firebase'
import './App.css';

export class App extends Component {

  state = {
      user: null,
  }

  componentDidMount() {

      // getting user info for navigation bar
      auth.onAuthStateChanged(user => {
          if (user) {
              db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
                  this.setState({
                      user: snapshot.data().Name
                  })
              })
          }
          else {
              this.setState({
                  user: null
              })
          }
      })

  }

  render() {
    return (
      <div className="App">
        <ProductsContextProvider>
              <CartContextProvider>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route exact path="/"  element={<Home/>}/>
                        <Route path="/signup" element={<SignUp/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/addproducts" element={<AddProducts/>}/>
                        <Route path="/produtos" element={<ItemListContainer/>}/>
                        <Route path="/item/:id" element={<ItemDetailContainer />} />
                    </Routes>
                </BrowserRouter>
            </CartContextProvider>
        </ProductsContextProvider>
      </div>
     )
    }
}

export default App
