import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/Mewtwo.png';

export default function CheckoutButton({ totalPrice }) {
	const pushlishableKey =
		'pk_test_51Imi4SIAnLFPMvKfMUV8zcYvy6D6iOMpX6IN62VrIsQob9bqyZ0sK9sT1kzbXhiUA6JYfg5DE9s92CAaPuXBmVKq00cWn7LFMx';

	const onToken = (token) => {
		console.log('token', token);
		alert('payment successful');
	};
	return (
		<StripeCheckout
			name='The MewTwoStore'
			token={onToken}
			stripeKey={pushlishableKey}
			shippingAddress
			billingAddress
			zipCode
			panelLabel='Pay Now'
			image={logo}
			description={`Your total is $${totalPrice}`}
			amount={totalPrice * 100}
		/>
	);
}
