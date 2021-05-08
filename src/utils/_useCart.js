import React, { useReducer, useEffect } from 'react';

// keep track of all items a cart
// save items to browser cookie
// check browser cookie after first render

const actions = {
	INCREASE: 'INCREASE',
	DECREASE: 'DECREASE',
	REMOVE: 'REMOVE',
	ADD: 'ADD',
};

const initialState = {
	products: [],
	totalPrice: 0,
	totalQuantity: 0,
};

function reducer(state, action) {
  let products;
  let totalPrice = state.totalPrice;
  let totalQuantity = state.totalQuantity;
  switch(action.type) {
    case actions.INCREASE:
      // find product with same id in state.products
      // increase quantity by 1
      products = state.products.map(product => {
        if(product.id === Number(action.payload.id)) {
          // increase total price by product price
          totalPrice = (parseFloat(totalPrice) + parseFloat(product.price)).toFixed(2);
          // increase total quantity
          totalQuantity = totalQuantity + 1;
          
          // update product
          return {
            ...product,
            quantity: product.quantity + 1,
            total: (parseFloat(product.total) + parseFloat(product.price)).toFixed(2),
          }
        }
        return product;
      });
      // return updated state
      return {products, totalPrice, totalQuantity};
    case actions.DECREASE:
      // find product with same id in state.products, decreate quantitye
      // if current product qnt <= 1, remove product
      products = state.products.map(product => {
        if(product.id === Number(action.payload.id)) {
          totalPrice = (parseFloat(totalPrice) - parseFloat(product.price)).toFixed(2);
          totalQuantity = totalQuantity - 1;

          return {
            ...product,
            quantity: product.quantity - 1,
            total: (parseFloat(totalPrice) - parseFloat(product.price)).toFixed(2),
          }
        }
        return product;
      }).filter(product => product.quantity > 0);

      return { products, totalPrice, totalQuantity };
    case actions.REMOVE: 
      // find product with same id in state.products
      products = state.products.filter(product => {
        // remove this product
        // decrease total price  by price * product qnt
        // decrease total quantity by product qnt
        if(product.id === Number(action.payload.id)) {
          totalPrice = (parseFloat(totalPrice) - parseFloat(product.total)).toFixed(2);
          totalQuantity = totalQuantity - product.quantity;
          return false;
        } 
        return product;
      });
      return { products, totalPrice, totalQuantity };
    case actions.ADD: 
      // find product with same id in state.products
      let isExist = false;
      // increase product quantity by 1
      products = state.products.map(product => {
        if(product.id === Number(action.payload.id)) {
          isExist = true;

          return {
            ...product,
            quantity: product.quantity + 1,
            total: (parseFloat(product.total) + parseFloat(action.payload.price)).toFixed(2),
          }
        }
        return product;
      });
      // if product is not found, add whole product to products
      if(!isExist) {
        const newProduct = {
          ...action.payload,
          quantity: 1,
          total: parseFloat(action.payload.price).toFixed(2),
        }
        products.push(newProduct);
      }
      // increase total price and qnt
      totalPrice = (parseFloat(totalPrice) + parseFloat(action.payload.price)).toFixed(2);
      totalQuantity = totalQuantity + 1;
      return { products, totalPrice, totalQuantity };
    default: return state;
  }
};

const CartContext = React.createContext();

function CartProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		// check cookie
		console.log('cart provider first useeffect');
	}, []);

	useEffect(() => {
		// update cookie
		console.log('cart provider useeffect, update cookie', state);
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}

function useCartContext() {
	const context = React.useContext(CartContext);

	if (context === undefined) {
		throw new Error('useCartContext must be used within a CartProvider');
	}
	return context;
}

export { CartProvider, useCartContext, actions };
