import React from 'react';
import './AddProducts.css';
import {useState} from 'react';
import { storage, db } from '../../config/firebase'



const AddProducts = ()=>{

// Para capturar las informaciones
const [ProductName, setProductName]  = useState("");
const [ProductPrice, setProductPrice] = useState("");
const [ProductColor, setProductColor] = useState("")
const [ProductDescription, setProductDescription] = useState("");
const [ProductImage, setProductImage] = useState(null);
const [error, setError] = useState('');
const types = ['image/png', 'image/jpeg']

const productImgHandler = (e) =>{

        
    let selectedFile = e.target.files[0]
    if(selectedFile && types.includes(selectedFile.type)){
        setProductImage(selectedFile)
        setError('')
    }
    
    else{
        setProductImage(null) 
        setError('Selecione una image valida png o jpg)')
    }
}

const addProduct = (e) =>{
    e.preventDefault()
    //para confirmar se las informaciones tuvieron exito
    /*console.log(ProductName, ProductPrice, ProductDescription, ProductImage) */

    const uploadTask = storage.ref(`product-images/${ProductImage.name}`).put(ProductImage);
    uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
    }, err => setError(err.message) ,
    () => {
        storage.ref('product-images').child(ProductImage.name).getDownloadURL().then(url => {
            db.collection('Products').add({
                ProductName: ProductName,
                ProductPrice: Number(ProductPrice),
                ProductColor: ProductColor,
                ProductImage: url,
                ProductDescription: ProductDescription
            }).then(() => {
                setProductName('');
                setProductPrice('')
                setProductImage('');
                setProductDescription('');
                setProductColor('');
                setError('');
                document.getElementById('color').value = '';
                document.getElementById('file').value = '';
            }).catch(err => setError(err.message))
        })
    })
}

    return(
        <div className='container'>
            <h2>
                AGREGAR PRODUCTOS
            </h2>
            <form 
                autoComplete='off'
                className='form-group' 
                onSubmit={addProduct}
            >
                <label htmlFor="product-name">Nombre</label>
                <input 
                    type="text" 
                    className='form-control' 
                    required
                    placeholder="Nombre del producto"
                    onChange={(e)=>setProductName(e.target.value)} value ={ProductName}
                    />
                <label htmlFor="product-price">Precio</label>
                <input 
                    type="text" 
                    className='form-control' 
                    required
                    onChange={(e)=>setProductPrice(e.target.value)} value ={ProductPrice}    
                />

                <label htmlFor="product-price">Color</label>
                <select name="color" id="color" onChange={(e)=>setProductPrice(e.target.value)} value ={ProductColor}>
                    <option value="">Elegir color</option>
                    <option value="Azul">Azul</option>
                    <option value="Verde">Verde</option>
                    <option value="Amarillo">Amarillo</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Otro">Otro</option>
                </select>
                
                <label htmlFor="product-description">Desp</label>
                <textarea 
                    name="description"
                    id=""  
                    rows="3" 
                    className="form-control" 
                    placeholder="escbibir acá"
                    onChange={(e)=>setProductDescription(e.target.value)} value ={ProductDescription}
                />
                
                <label htmlFor="product-name">Imagem</label>
                <input 
                    type="file" 
                    onChange={productImgHandler}
                    id="file"
                />

                <button>Agregar Produtos</button>
            </form>
            {error&& <span>{error}</span>}
        </div>
    )
}
export default AddProducts