import React from 'react';
import { useParams, Link } from 'react-router-dom';

import useProduct from './_useProduct';

import { actions, useCartContext } from '../../utils/_useCart';

import './ProductDetail.css';

// get id from react router
// fetch data based on id for product

// get functionality from useCart context
// actions: addItem

const tempStyle = {
	margin: '0 auto',
	maxWidth: '1200px',
	padding: '30px',
};

function ProductDetail() {
	//get id from router
	const { id } = useParams();

	const { dispatch } = useCartContext();

	const [loading, product] = useProduct(id);

	function handleClick() {
		console.log('ADD TO CART', id);
		const productPayload = {
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
		};
		dispatch({ type: actions.ADD, payload: { ...productPayload } });
	}

	const title = loading ? (
		<div className='mockTitle'></div>
	) : (
		<h1 className='productTitle'>{product.title}</h1>
	);
	const description = loading ? (
		<p className='mockDescription'></p>
	) : (
		<p className='productDescription'>{product.description}</p>
	);
	const productPrice = loading ? '$' : `$${product.price}`;

	return (
		<div style={tempStyle}>
			<div className='breadCrumbWrapper'>
				<Link to='/'>&larr; Back to all products</Link>
			</div>
			<div className='productContainer'>
				<div className='productImage'>
					<div className='productImageWrapper'>
						<img
							src={loading ? '' : product.image}
							alt={product ? product.title : ''}
						></img>
					</div>
				</div>
				<div className='productInfo'>
					{title}
					<div className='priceWrapper'>
						<span>{productPrice}</span>
					</div>
					<button className='productButton' onClick={handleClick}>
						Add to Cart
					</button>

					{description}
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;
