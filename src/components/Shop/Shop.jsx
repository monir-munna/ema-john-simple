import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect( () => {
    fetch('products.json')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])


  useEffect( () => {
    const storeCart = getShoppingCart();
    const savedCart = [];

    // step-1: get id
    for(const id in storeCart){

      // step-2: get the product by using id
      const addedProduct = products.find(product => product.id == id);
      if(addedProduct){
        // step-3: add quantity
        const quantity = storeCart[id];
        addedProduct.quantity = quantity;

        // step-4: add the addedProduct to the saved cart
        savedCart.push(addedProduct);
      }
    }
    
    // step-5: set the cart
    setCart(savedCart);
  }, [products])


  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id)
  }

  return (
    <div className='shop-container'>
      <div className="products-container">
        {
          products.map(product => <Product 
            key={product.id}
            product = {product}
            handleAddToCart={handleAddToCart}
            ></Product>)
        }
      </div>
      <div className="card-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;