import React from 'react';

import { Link } from 'react-router-dom';

import { actions, useCartContext } from '../../utils/_useCart';

import CheckoutButton from '../Stripe-Checkout/StripeCheckout';

import './ShoppingCart.css';

// get data from context useCart
// get functionality from context useCart:
// -- updateCart
// -- type: changeQuantity, removeItem

// const data = {
//   products: [
//     {
//       id: 1,
//       title: 'Product Title 1',
//       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//       price: 50,
//       quantity: 2,
//       total: 100,
//     },
//     {
//       id: 2,
//       title: 'Product Title 2',
//       image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
//       price: 30,
//       quantity: 1,
//       total: 30,
//     },
//   ],
//   total: 130,
// }

const tempStyle = {
	margin: '0 auto',
	maxWidth: '1200px',
	padding: '30px',
};

function ShoppingCart() {
	const {
		state: { totalPrice, products },
		dispatch,
	} = useCartContext();

	function handleClick(event) {
		const id = event.target.id;
		dispatch({ type: actions.REMOVE, payload: { id } });
	}

	return (
		<div style={tempStyle}>
			<h1>Shopping cart</h1>
			<div className='cartContainer'>
				<div className='cartItems-wrapper'>
					{products.length > 0 ? (
						products.map(({ id, title, image, price, quantity, total }) => {
							return (
								<div key={id} className='cartItem'>
									<div className='cartItem-img'>
										<Link to={`/products/${id}`}>
											<img className='cartItemImage' src={image} alt={title} />
										</Link>
									</div>
									<div className='cartItem-info'>
										<span className='cartItem-title'>{title}</span>
										<span className='cartItem-price'>${price}</span>
										<input value={quantity}></input>
										<span className='cartItem-total'>${total}</span>
									</div>
									{/* <div className='cartItem-total'>{total}</div> */}
									<div className='cartItem-remove'>
										<button
											aria-label='remove item from cart'
											id={id}
											onClick={handleClick}
										>
											X
										</button>
									</div>
								</div>
							);
						})
					) : (
						<div>
							You don't have any products in your cart. Browse{' '}
							<Link to='/'>here</Link>
						</div>
					)}
				</div>
				<div className='cartTotal'>
					<span>Total: {totalPrice}</span>
					<CheckoutButton />
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
